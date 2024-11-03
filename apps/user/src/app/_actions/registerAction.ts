"use server";
import { prisma } from "@repo/db/client";
import bcrypt from "bcryptjs";
import { registrationSchema } from "@repo/common/user";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
export async function registerUser(prevState: unknown, formData: FormData) {
	const formdata = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		passwordConfirm: formData.get("passwordConfirm"),
	};
	try {
		const refinedData = await registrationSchema.parseAsync(formdata);
		const hashedPassword = await bcrypt.hash(refinedData.password, 10);
		await prisma.user.create({
			data: {
				email: refinedData.email,
				password: hashedPassword,
				name: refinedData.name,
			},
		});
	} catch (error) {
		if (error instanceof ZodError) {
			const zError = error.errors.reduce(
				(acc: { [index: string]: string }, err) => {
					const test = `${err.path[0]}`;
					acc[test] = err.message;
					return acc;
				},
				{}
			);
			console.log("Instance of Zod Error", zError);
			return zError;
		} else if (error instanceof Error) {
			console.log("Instance of Error");
			console.log(error);
			return { error: error.message };
		} else {
			return { error: "Something went terribly wrong ❌ -register action" };
		}
	}
	redirect("/");
}
