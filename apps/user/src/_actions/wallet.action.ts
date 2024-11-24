"use server";
import { auth } from "../auth";
import { v4 } from "uuid";
import { prisma } from "@repo/db/client";
import { OnRampStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { setAmount } from "@repo/common/utils";
import { loadWalletSchema } from "@repo/common/wallet";

export async function loadWallet(
	prevState: unknown,
	formdata: FormData
): Promise<Partial<{ [index: string]: string }>> {
	const session = await auth();
	if (!session?.user || !session.user.id) return { error: "No Session Found" };
	const data = {
		amount: Number(formdata.get("amount")),
		redirectUrl: formdata.get("bank") as string,
	};
	const token = v4();
	const redirectUrl = formdata.get("bank") as string;
	try {
		const refinedData = loadWalletSchema.parse(data);
		await prisma.onRampTransaction.create({
			data: {
				userId: session.user.id,
				status: OnRampStatus.Processing,
				token: token,
				provider: refinedData.redirectUrl,
				startTime: new Date(),
				amount: setAmount(refinedData.amount),
			},
		});
		revalidatePath("/transfer");
		return { success: redirectUrl };
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
