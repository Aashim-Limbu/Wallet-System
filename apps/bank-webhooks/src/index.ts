import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { prisma } from "@repo/db/client";
import { OnRampStatus } from "@prisma/client";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "Hi from banking server",
	});
});
app.post("/web-hook", async (req, res) => {
	const { amount, userId, token } = req.body;

	try {
		await prisma.$transaction([
			prisma.balance.upsert({
				where: {
					userId: userId,
				},
				update: {
					amount: {
						increment: amount,
					},
				},
                create:{
                    amount:amount || 0,
                    userId:userId
                }
			}),
			prisma.onRampTransaction.update({
				where: {
					token: token,
				},
				data: {
					status: OnRampStatus.Success,
				},
			}),
		]);
		res.status(200).json({
			status: "success",
			message: "Captured the request",
		});
	} catch (error) {
		console.log(error);
		res.status(411).json({
			status: "Failed",
			message: "Error while executing the web-hook",
		});
	}
});
app.all("*", (req, res) => {
	res.status(404).json({
		message: `${req.protocol}://${req.get("host")}${req.originalUrl} not defined .`,
		status: "error",
	});
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is listening to ${port}`);
});
