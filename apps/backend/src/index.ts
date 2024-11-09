import express from "express";
import { prisma } from "@repo/db/client";
import { OnRampStatus } from "@prisma/client";
const app = express();
app.use(express());
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
			prisma.balance.update({
				where: {
					userId: userId,
				},
				data: {
					amount: {
						increment: amount,
					},
				},
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
app.listen(8000, () => {
	console.log("Port is listening to 8000:");
});
