import { prisma } from "./prisma";

export async function getUserByEmail(email: string) {
	const user = prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
}