import express from "express";
const app = express();
app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "Hi from banking server",
	});
});
app.listen(8000, () => {
	console.log("Port is listening to 8000:");
});
