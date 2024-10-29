import { z } from "zod";
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
