require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get all Notes
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});

    if (data) {
      res.status(201).json(data);
    } else {
      throw new Error("An error has occured while retrieving data");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occured while retrieving data" });
  }
});

// Get a Note by ID
app.get("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Notes.findById(id);

    if (data) {
      res.status(201).json(data);
    } else {
      throw new Error("An error has occured while retrieving data");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occured while retrieving data" });
  }
});

// Post a Note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = await Notes.create({ title, description });

    if (data) {
      res.status(201).json(data);
    } else {
      throw new Error("An error has occured while posting data");
    }
  } catch (error) {
    res.status(500).json({ error: "An error has occured while posting data" });
  }
});

// Update a Note by ID
app.put("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    const data = await Notes.findByIdAndUpdate(id, { title, description });

    if (data) {
      res.status(201).json(data);
    } else {
      throw new Error("An error has occured while posting data");
    }
  } catch (error) {
    res.status(500).json({ error: "An error has occured while posting data" });
  }
});

// Delete a Note by ID
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Notes.findByIdAndDelete(id);

    if (data) {
      res.status(201).json(data);
    } else {
      throw new Error("An error has occured while attempting to delete data");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error has occured while attempting to delete data" });
  }
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
