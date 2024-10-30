import prisma from "@repo/db/client";
import { z } from "zod";
async function checkUniqueEmail(email: string) {
	return await prisma.user.findUnique({ where: { email: email } });
}
export const signInSchema = z.object({
	email: z
		.string({ required_error: "Email Field is Required" })
		.email({ message: "Invalid Email format" }),
	password: z
		.string()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
			{
				message:
					"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
			}
		),
});
export const signUpSchema = z
	.object({
		name: z
			.string({
				required_error: "Name is required",
			})
			.min(5, { message: "Name should have at least 5 characters" }),

		email: z
			.string({
				required_error: "Email is required",
			})
			.email({ message: "Invalid email format" }),

		password: z
			.string()
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
				}
			),

		passwordConfirm: z
			.string({
				required_error: "Please confirm your password",
			})
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
			),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ["passwordConfirm"],
		message: "Passwords do not match",
	})
	.refine(
		async (data) => {
			const emailExists = await checkUniqueEmail(data.email);
			return !emailExists;
		},
		{
			path: ["email"],
			message: "Email Already Exists",
		}
	);
