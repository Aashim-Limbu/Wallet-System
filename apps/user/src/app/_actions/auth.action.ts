"use server";
import { signUpSchema } from "@repo/common/authSchema";
import prisma from "@repo/db/client";

import bcrypt from "bcryptjs";
import { redirect, RedirectType } from "next/navigation";

export type SignUpState = {
	success?: boolean;
	errors?: { path: string; message: string }[];
};

export async function signUp(
	prevData: unknown,
	formData: FormData
): Promise<SignUpState | undefined> {
	const formdata = Object.fromEntries(formData.entries());
	const formEntry = await signUpSchema.safeParseAsync(formdata);
	console.log(formEntry);
	let shouldRedirect = false;
	if (!formEntry.success) {
		return {
			success: false,
			errors: formEntry.error?.issues.map((error) => ({
				path: error.path.join("."),
				message: error.message,
			})),
		};
	}

	try {
		const saltedPassword = await bcrypt.hash(formEntry.data.password, 12);

		await prisma.user.create({
			data: {
				...formEntry.data,
				password: saltedPassword,
				passwordConfirm: "",
			},
		});
		shouldRedirect = true;
	} catch (error) {
		console.error("Error 💥💥", error);
		return {
			success: false,
			errors: [{ path: "server", message: `${error}` }],
		};
	}
	if (shouldRedirect) {
		console.log("This should redirect to home");
		redirect("/home");
	}
}
