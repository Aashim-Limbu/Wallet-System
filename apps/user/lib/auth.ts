import { signInSchema } from "@repo/common/authSchema";
import prisma from "@repo/db/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "john_doe@gmail.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const refinedBody = signInSchema.safeParse(credentials);
				if (!refinedBody.success) {
					const errorMessages = refinedBody.error.errors.map(
						(error) => error.message
					);
					throw new Error(errorMessages.join(", "));
				}
				const user = await prisma.user.findUnique({
					where: {
						email: refinedBody.data.email,
					},
				});
				if (
					user &&
					(await bcrypt.compare(refinedBody.data.password, user?.password))
				) {
					return { id: user.id, email: user.email, name: user.name };
				}
				throw new Error("Credentials not Correct!!");
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/signin",
	},
};
