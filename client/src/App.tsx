import { useEffect, useState } from "react";
import AddMovieForm from "./AddMovie";
import "./App.css";
import Movielist from "./Movielist";

export type Movie = {
  _id: string;
  title: string;
  description: string;
  year: number;
};

function App() {
  const [filmer, setFilmer] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    const res = await fetch("http://localhost:5000/api/movies");
    const data = await res.json();
    setFilmer(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Movielist filmer={filmer} onDelete={fetchMovies} />
      <AddMovieForm onAdd={fetchMovies} />
    </>
  );
}

export default App;
