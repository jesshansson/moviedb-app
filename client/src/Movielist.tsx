import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  description: string;
};

function Movielist() {
  const [filmer, setFilmer] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setFilmer(data));
  }, []);

  return (
    <div>
      <h2>Movies:</h2>
      <ul>
        {filmer.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>: {movie.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movielist;
