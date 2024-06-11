import express from "express";

const app = express();
const PORT = 5001;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
