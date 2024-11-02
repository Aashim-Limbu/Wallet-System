import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@repo/common/user";
import { prisma } from "@repo/db/client";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			name: "Sign in with Email and password",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					required: true,
					placeholder: "johndoe@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const refinedBody = await loginSchema.parseAsync(credentials);
				const hashedPassword = await bcrypt.hash(refinedBody.password, 10);
				await prisma.user.create({
					data: {
						email: refinedBody.email,
						password: hashedPassword,
					},
				});
			},
		}),
	],
});
