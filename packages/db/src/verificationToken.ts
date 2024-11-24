import { prisma } from "./prisma";

export async function getVerificationTokenByEmail(email: string) {
	try {
		const verificationToken = await prisma.verificationToken.findFirst({
			where: { email },
		});
		return verificationToken;
	} catch (error) {
		return null;
	}
}
export async function verifyPasswordResetTokenByEmail(email: string) {
	const resetToken = await prisma.passwordResetToken.findFirst({
		where: { email },
	});
	return resetToken;
}
export async function verifyPasswordResetTokenByToken(token: string) {
	const resetToken = await prisma.passwordResetToken.findFirst({
		where: { token },
	});
	return resetToken;
}
export async function verify2FATokenByEmail(email: string) {
	const token = await prisma.twoFactorToken.findFirst({ where: { email } });
	return token;
}
export async function get2FATokenByToken(token: string) {
	const token2FA = await prisma.twoFactorToken.findUnique({ where: { token } });
	return token2FA;
}
export async function get2FAConfirmationByUserId(userId: string) {
	const confirmation = await prisma.twoFactorConfirmation.findUnique({
		where: { userId },
	});
    return confirmation;
}
