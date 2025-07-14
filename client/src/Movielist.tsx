import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  description: string;
  year: number;
};

function Movielist() {
  const [filmer, setFilmer] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setFilmer(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Movies:
      </h2>
      <ul className="max-w-xl mx-auto space-y-4">
        {filmer.map((movie) => (
          <li
            key={movie.id}
            className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition"
          >
            <strong className="text-lg text-gray-800">{movie.title}</strong>
            <span className="text-gray-600">
              : {movie.description}, {movie.year}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movielist;
