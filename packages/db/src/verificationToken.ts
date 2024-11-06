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
    return resetToken
}
