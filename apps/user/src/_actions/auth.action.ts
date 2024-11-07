"use server";
import { prisma } from "@repo/db/client";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import bcrypt from "bcryptjs";
import {
	registrationSchema,
	loginSchema,
	checkEmailSchema,
	transformZodErrorsToFieldErrors,
	passwordResetSchema,
} from "@repo/common/user";
import { ZodError } from "zod";
import { getUserByEmail } from "@repo/db/user";
import {
	send2FATokenEmail,
	sendResetPasswordEmail,
	sendVerificationEmail,
} from "@repo/common/send-email";
import {
	generate2FAToken,
	generatePasswordResetToken,
	generateVerificationToken,
} from "@repo/db/generateVerificationToken";
import {
	verifyPasswordResetTokenByToken,
	get2FAConfirmationByUserId,
	verify2FATokenByEmail,
} from "@repo/db/getVerificationByEmail";
export async function registerUser(prevState: unknown, formData: FormData) {
	const formdata = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		passwordConfirm: formData.get("passwordConfirm"),
	};
	try {
		const refinedData = await registrationSchema.parseAsync(formdata);
		const hashedPassword = await bcrypt.hash(refinedData.password, 10);
		await prisma.user.create({
			data: {
				email: refinedData.email,
				password: hashedPassword,
				name: refinedData.name,
			},
		});
		const verificationToken = await generateVerificationToken(
			refinedData.email
		);
		await sendVerificationEmail(refinedData.email, verificationToken);
		return { success: "Confirmation Email sent" };
	} catch (error) {
		if (error instanceof ZodError) {
			const zError = transformZodErrorsToFieldErrors(error.errors);
			return zError;
		} else if (error instanceof Error) {
			return { error: error.message };
		} else {
			return { error: "Something went terribly wrong ❌ -register action" };
		}
	}
}
export async function login(prevState: unknown, formdata: FormData) {
	const data = {
		email: formdata.get("email"),
		password: formdata.get("password"),
		code: formdata.get("code"),
	};
	const refinedData = loginSchema.safeParse(data);
	if (!refinedData.success) {
		console.log(refinedData.error.errors);
		return { error: "Invalid Fields" };
	}
	const { email, password, code } = refinedData.data;
	console.log(refinedData.data);
	const existingUser = await getUserByEmail(email);
	//! this is for a case where you will have email for O-Auth login and you need to distinct between the O-Auth vs credential user
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "User doesn't exists" };
	}
	const isValidPassword = await bcrypt.compare(password, existingUser.password);
	//!validating the password before
	if (!isValidPassword) return { error: "Password don't match" };
	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(email);
		await sendVerificationEmail(email, verificationToken);
		return { success: "You are not verified. Confirmation Email sent" };
	}
	//! for two factor enabled user
	if (existingUser.isEnabled2FA) {
		if (code) {
			const twoFactorToken = await verify2FATokenByEmail(existingUser.email);
			if (!twoFactorToken) return { error: "Invalid Token" };
			if (twoFactorToken.token !== code)
				return { error: "Sorry token didn't matched" };
			const hasExpired = twoFactorToken.expires < new Date();
			if (hasExpired) return { error: "Token has expired" };

			await prisma.twoFactorToken.delete({
				where: {
					token_email: {
						token: twoFactorToken.token,
						email: twoFactorToken.email,
					},
				},
			});
			const existingConfirmation = await get2FAConfirmationByUserId(
				existingUser.id
			);
			if (existingConfirmation) {
				await prisma.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}
			await prisma.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twofactoAuthToken = await generate2FAToken(existingUser.email);
			await send2FATokenEmail(existingUser.email, twofactoAuthToken.token);
			return { change: true };
		}
	}
	try {
		//* if above condition are satisfied we're ready to signin for otp the logic is inside the callback.signin
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
		return { success: "Successfully login" };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid Credentials" };
				default:
					return { error: "Something went wrong" };
			}
		}
		throw error;
	}
}
export async function validateToken(prevState: unknown, token: string) {
	//token from search param
	const verificationToken = await prisma.verificationToken.findFirst({
		where: { token },
	});
	if (!verificationToken)
		return { error: "Invalid Token Sorry cannot proceed you request" };
	if (verificationToken?.expires < new Date())
		return { error: "Sorry but the token has expired" };
	const existingUser = await getUserByEmail(verificationToken.email);
	if (!existingUser) return { error: "Email doesn't exists" };
	await prisma.user.update({
		where: { email: existingUser.email },
		data: {
			emailVerified: new Date(),
			email: verificationToken.email, //^ User request for email update
		},
	});
	await prisma.verificationToken.delete({
		where: {
			id_token: {
				id: verificationToken.id,
				token: verificationToken.token,
			},
		},
	});
	return { success: "Successfully verified please login " };
}
export async function resetPassword(prevState: unknown, formData: FormData) {
	const emailInput = { email: formData.get("email") };
	try {
		const refinedEmail = await checkEmailSchema.parseAsync(emailInput);
		const { email } = refinedEmail;
		const existingUser = await getUserByEmail(email);
		if (!existingUser) return { error: "User doesn't exists" };
		//user is there so create token
		const token = await generatePasswordResetToken(email);
		//send mail
		await sendResetPasswordEmail(email, token);
		return { success: "Password Reset Token sent successfully" };
	} catch (error) {
		if (error instanceof ZodError) {
			const zError = transformZodErrorsToFieldErrors(error.errors);
			if (zError.email === "user_do_not_exists")
				return { error: "Sorry User do not exists" };
			return zError;
		} else if (error instanceof Error) {
			return { error: error.message };
		} else {
			return { error: "Something went wrong" };
		}
	}
}
export async function changePassword(
	token: string,
	prevState: unknown,
	formData: FormData
) {
	const formdata = {
		password: formData.get("password") as string,
		passwordConfirm: formData.get("passwordConfirm") as string,
	};
	console.log({ token });
	try {
		const refinedFormData = passwordResetSchema.parse(formdata);
		if (!token) return { error: "token not found" };
		console.log(refinedFormData);
		const verifyToken = await verifyPasswordResetTokenByToken(token);
		if (!verifyToken) return { error: "Invalid Token" };
		if (verifyToken.expires < new Date())
			return { error: "Token has expired !" };
		const existingUser = await getUserByEmail(verifyToken.email);
		if (!existingUser) return { error: "Request Failed !User do not exists" };
		const hashedPassword = await bcrypt.hash(refinedFormData.password, 12);
		await prisma.user.update({
			where: { email: existingUser.email },
			data: {
				password: hashedPassword,
			},
		});
		await prisma.passwordResetToken.delete({
			where: {
				email_token: {
					email: existingUser.email,
					token: token,
				},
			},
		});
		return { success: "Password Reset successfull Please Login " };
	} catch (error) {
		if (error instanceof ZodError) {
			const zError = transformZodErrorsToFieldErrors(error.errors);
			console.log(zError);
			return zError;
		} else if (error instanceof Error) {
			console.log(error);
			return { error: error.message };
		} else {
			return { error: "Something went wrong" };
		}
	}
}
