import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";
export const getOnRampTransactions = unstable_cache(
	async (userId: string) => {
		try {
			const rampTxns = await prisma.onRampTransaction.findMany({
				where: {
					userId,
				},
				orderBy: {
					startTime: "desc",
				},
				take: 2,
			});
			return rampTxns;
		} catch (error) {
			console.log(error);
			throw new Error("Can't get the Ramp Txns");
		}
	},
	["getOnRamp"],
	{ revalidate: 3600, tags: ["getOnRamp"] }
);
