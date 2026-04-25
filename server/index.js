require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Connect to MongoDB
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const client = new MongoClient(uri);

let moviesCollection;

async function connectToMongo() {
  try {
    await client.connect();
    const db = client.db("movie-database");
    moviesCollection = db.collection("movies"); // collection
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
  }
}
connectToMongo();

// === API-ENDPOINTS ===

// Get movies
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await moviesCollection.find().toArray();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Error fetching movies" });
  }
});

// Add a movie
app.post("/api/movies", async (req, res) => {
  try {
    const movie = req.body;
    const result = await moviesCollection.insertOne(movie);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error adding movie" });
  }
});

app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});

// Delete a movie by id
app.delete("/api/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await moviesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.json({ message: "Movie deleted" });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error deleting movie" });
  }
});
