"use server";
import { prisma } from "@repo/db/client";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import bcrypt from "bcryptjs";
import { registrationSchema, loginSchema } from "@repo/common/user";
import { ZodError } from "zod";
import { getUserByEmail } from "@repo/db/user";
import { sendVerificationEmail } from "@/_config/mail.config";
import { generateVerificationToken } from "@repo/db/generateVerificationToken";
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
			const zError = error.errors.reduce(
				(acc: { [index: string]: string }, err) => {
					const test = `${err.path[0]}`;
					acc[test] = err.message;
					return acc;
				},
				{}
			);
			console.log("Instance of Zod Error", zError);
			return zError;
		} else if (error instanceof Error) {
			console.log("Instance of Error");
			console.log(error);
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
	};
	const refinedData = loginSchema.safeParse(data);
	if (!refinedData.success) {
		// console.log(refinedData.error);
		return { error: "Invalid Fields" };
	}
	const { email, password } = refinedData.data;
	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "User doesn't exists" };
	}
	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(email);
		await sendVerificationEmail(email, verificationToken);
		return { success: "Confirmation Email sent" };
	}
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
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
