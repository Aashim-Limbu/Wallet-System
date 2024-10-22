import express from "express";
const app = express();
app.get("/", (req, res) => {
	res.send("Hi from the Monorepo backend");
});
app.listen(8000, () => {
	console.log("Server Listening on port 8000:💻 ");
});
