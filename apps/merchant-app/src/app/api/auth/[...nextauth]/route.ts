import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "@repo/db/client";
import GoogleProvider from "next-auth/providers/google";
const nextAuthOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.NEXT_AUTH_SECRET,
	callbacks: {
		async signIn({ user, account }) {
			if (!user || !user.email || !account || !user.name) return false;
			await prisma.merchent.upsert({
				select: { id: true },
				where: {
					email: user.email,
				},
				create: {
					email: user.email,
					name: user.name,
					auth_type: account?.provider === "google" ? "Google" : "Github",
				},
				update: {
					name: user.name,
					auth_type: account.provider === "google" ? "Google" : "Github",
				},
			});
			return true;
		},
	},
};
const handler = NextAuth(nextAuthOptions);
export const GET = handler;
export const POST = handler;
