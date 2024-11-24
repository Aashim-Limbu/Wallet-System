import { z } from "zod";
import { prisma } from "./prisma";

async function addBank({
	name,
	redirectUrl,
}: {
	name: string;
	redirectUrl: string;
}) {
	const bank = await prisma.bank.create({
		data: {
			name,
			redirectUrl,
		},
	});
}
addBank({
	name: "Nepal Merchant Bank",
	redirectUrl: "https://ibank.nmb.com.np/#/login",
});
