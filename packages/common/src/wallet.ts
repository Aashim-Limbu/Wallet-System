import { z } from "zod";
export const loadWalletSchema = z.object({
	amount: z.number().gte(50, { message: "Amount must be greater than 50" }),
	redirectUrl: z.string({ message: "Please Select a Bank" }),
});
