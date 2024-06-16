import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// __dirname kullanımı için bu iki satırı ekliyorum
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env dosyasının yolunu belirtiyorum
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = 5001;
const uri = process.env.MONGODB_URI;

// Debugging için URI'yı konsola yazdır
console.log("MongoDB URI: ", uri);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

// Middleware'lar .use kullanır
app.use(cors());
app.use(express.json());

// Rotaları tanımlama
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
