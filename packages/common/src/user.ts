import { z } from "zod";
import { getUserByEmail } from "@repo/db/user";
import { ZodIssue } from "zod";
type FieldError = { [key: string]: string };
export const transformZodErrorsToFieldErrors = (
	errors: ZodIssue[]
): FieldError => {
	return errors.reduce((acc: FieldError, error: ZodIssue) => {
		const field = error.path[0] as string;
		const message = error.message;
		acc[field] = message;
		return acc;
	}, {});
};

export const loginSchema = z.object({
	email: z
		.string({ required_error: "Email field is empty" })
		.email({ message: "Invalid Email Address" }),
	password: z
		.string({ required_error: "Password Field is empty" })
		.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {
			message:
				"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
		}),
});
export const registrationSchema = z .object({
		name: z
			.string({ required_error: "Name field is empty" })
			.min(3, { message: "A name must be greater than 3" }),
		email: z
			.string({ required_error: "Email field is empty" })
			.email({ message: "Invalid Email Format" })
			.refine(
				async (email) => {
					const existingUser = await getUserByEmail(email);
					return !existingUser;
				},

				{ message: "Email already in use" }
			),
		password: z
			.string({ required_error: "Password Field is empty" })
			.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {
				message:
					"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
			}),
		passwordConfirm: z.string({
			required_error: "Password Confirm Field is empty",
		}),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Password do not match",
		path: ["passwordConfirm"],
	});
export const checkEmailSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid Email Format" })
		.refine(
			async (email) => {
				const existingUser = await getUserByEmail(email);
				return existingUser;
			},
			{ message: "user_do_not_exists", path: ["email"] }
		),
});
export const passwordResetSchema = z
	.object({
		password: z
			.string()
			.min(1, { message: "Password Field is empty" })
			.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {
				message:
					"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
			}),
		passwordConfirm: z.string().min(1, "password Confirm is empty"),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Password do not match",
		path: ["passwordConfirm"],
	});
