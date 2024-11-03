import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@repo/db/client";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@repo/common/user";
import { getUserByEmail } from "@repo/db/user";
import bcrypt from "bcryptjs";
export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	providers: [
		Credentials({
			name: "Sign in with Email and Password",
			async authorize(credentials) {
				const refinedFields = loginSchema.safeParse(credentials);
				if (refinedFields.success) {
					const user = await getUserByEmail(refinedFields.data.email);
					if (!user || !user.password) return null; //say for o-auth user they won't have password so they shouldn't be allowed to login with credentials
					const passwordMatch = await bcrypt.compare(
						refinedFields.data.password,
						user.password
					);
					if (passwordMatch) return user;
				}
				return null;
			},
		}),
	],
});
