const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World från backend!");
});

const filmer = [
  { id: 1, titel: "Inception", beskrivning: "Drömmar och hemligheter." },
  { id: 2, titel: "Titanic", beskrivning: "Isberg, kärlek och drama." },
];

app.get("/api/filmer", (req, res) => {
  res.json(filmer);
});

app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
