const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World från backend!");
});

const movies = [
  { id: 1, title: "Inception", description: "Drömmar och hemligheter." },
  { id: 2, title: "Titanic", description: "Isberg, kärlek och drama." },
];

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
