"use server";
import { auth } from "../auth";
import { v4 } from "uuid";
import { prisma } from "@repo/db/client";
import { OnRampStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { setAmount } from "@repo/common/utils";
import { redirect } from "next/navigation";

export async function loadWallet(
	prevState: unknown,
	formdata: FormData
): Promise<Partial<{ [index: string]: string }>> {
	const session = await auth();
	const data = {
		amount: formdata.get("amount") as string,
		redirectUrl: formdata.get("bank") as string,
	};
	const redirectUrl = formdata.get("bank") as string;
	if (!session?.user) return { error: "Not a session user" };
	try {
		const token = v4();
		if (!session.user.id) return { error: "User not found" };
		await prisma.onRampTransaction.create({
			data: {
				userId: session.user.id,
				status: OnRampStatus.Processing,
				token: token,
				provider: data.redirectUrl,
				startTime: new Date(),
				amount: setAmount(Number(data.amount)),
			},
		});
		revalidatePath("/transfer");
        return {success:redirectUrl}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			return { error: error.message };
		} else {
			console.log(error);
			return { error: "something went wrong please try again" };
		}
	}
}
