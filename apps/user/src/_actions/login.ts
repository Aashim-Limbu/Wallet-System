"use server";
import { loginSchema } from "@repo/common/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
export default async function login(prevState: unknown, formdata: FormData) {
	const data = {
		email: formdata.get("email"),
		password: formdata.get("password"),
	};
	const refinedData = loginSchema.safeParse(data);
	if (!refinedData.success) {
		return { error: "Invalid Fields" };
	}
	const { email, password } = refinedData.data;
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid Credentials" };
				default:
					return { error: "Something went wrong" };
			}
		}
		throw error;
	}
}
