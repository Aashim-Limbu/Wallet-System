import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@repo/db/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(  prisma),
	providers: [],
});
