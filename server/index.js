const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Connect to MongoDB
const uri =
  "mongodb+srv://jessicahansson:rcumR1gkB9F5RW3N@movie-database.kcxxvp4.mongodb.net/?retryWrites=true&w=majority&appName=movie-database";
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
