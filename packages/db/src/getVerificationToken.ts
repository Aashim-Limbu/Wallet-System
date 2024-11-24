import { randomBytes } from "crypto";
import { prisma } from "./prisma";
import crypto from "crypto";
import {
	verifyPasswordResetTokenByEmail,
	getVerificationTokenByEmail,
	verify2FATokenByEmail,
} from "./verificationToken";
import { v4 } from "uuid";

export async function generateVerificationToken(email: string) {
	const verificationToken = randomBytes(32).toString("hex");
	const expires = new Date(Date.now() + 60 * 60 * 1000);
	const existingToken = await getVerificationTokenByEmail(email);
	if (existingToken) {
		await prisma.verificationToken.delete({
			where: { id_token: { id: existingToken.id, token: existingToken.token } },
		});
	}
	await prisma.verificationToken.create({
		data: {
			token: verificationToken,
			expires,
			email,
			id: v4(),
		},
	});
	return verificationToken;
}
export async function generatePasswordResetToken(email: string) {
	const token = v4();
	const expires = new Date(Date.now() + 60 * 60 * 1000);
	const existingToken = await verifyPasswordResetTokenByEmail(email);
	if (existingToken) {
		await prisma.passwordResetToken.delete({
			where: {
				email_token: {
					email,
					token: existingToken.token,
				},
			},
		});
	}
	await prisma.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return token;
}
export async function generate2FAToken(email: string) {
	const token = crypto.randomInt(100_000, 1_000_000).toString();
	try {
		const expires = new Date(Date.now() + 60 * 60 * 1000);
		const hasToken = await verify2FATokenByEmail(email);
		if (hasToken) {
			await prisma.twoFactorToken.delete({
				where: {
					id: hasToken.id,
				},
			});
		}
		const F2Atoken = await prisma.twoFactorToken.create({
			data: {
				token,
				expires,
				email,
			},
		});
		return F2Atoken;
	} catch (error) {
		if (error instanceof Error) {
			// console.log(error);
			throw new Error(error.message);
		} else {
			throw new Error("sorry 2FA couldn't be created");
		}
	}
}
