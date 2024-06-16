import express from "express";
import Todo from "../models/todoModel.js";

const router = express.Router();

// Bütün todoları al
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("GET / Error: ", error);
    res.status(500).json({ message: error.message });
  }
});

// Yeni bir todo oluştur
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("POST / Error: ", error);
    res.status(400).json({ message: error.message });
  }
});

// Güncelle todoyu
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (error) {
    console.error("PUT /:id Error: ", error);
    res.status(400).json({ message: error.message });
  }
});

// Sil todoyu
router.delete("/:id", async (req, res) => {
  try {
    console.log("DELETE request received for ID: ", req.params.id);
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("DELETE /:id Error: ", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
