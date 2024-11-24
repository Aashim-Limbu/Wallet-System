import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@repo/db/client";
import authConfig from "@/auth.config";
import { getUserById } from "@repo/db/user";
import { get2FAConfirmationByUserId } from "@repo/db/getVerificationByEmail";
export const { handlers, auth, signIn, signOut } = NextAuth({
	events: {
		//events are something that doesn't return response but useful for logs , handle side effects like in our case.
		//this gets trigger when we use one of the provider like google, github,twitter so we directly manipulated the emailVerified to be true
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: {
					emailVerified: new Date(),
				},
			});
		},
	},
	pages: {
		signIn: "/login",
		error: "/error",
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== "credentials") return true;
			if (!user.id) return false;
			const existingUser = await getUserById(user.id);
			if (!existingUser?.emailVerified) return false;
			if (existingUser.isEnabled2FA) {
				const isConfirmed = await get2FAConfirmationByUserId(existingUser.id);
				if (!isConfirmed) return false;
				await prisma.twoFactorConfirmation.delete({
					where: { id: isConfirmed.id },
				});
			}
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub; //adding id
			}
			if (token.role && session.user) {
				session.user.role = token.role;
			}
			// console.log("Session", session);
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			token.role = existingUser.role;
			// console.log("Token", token); //^so we have token.sub with the user id now to pass it to session
			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
});
