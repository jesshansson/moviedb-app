import type { Movie } from "./App";

type Props = {
  filmer: Movie[];
  onDelete: () => void;
};

function Movielist({ filmer, onDelete }: Props) {
  const deleteMovie = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      onDelete(); // Hämta filmer på nytt från backend
    } else {
      alert("Kunde inte ta bort filmen.");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Movies:
      </h2>
      <ul className="max-w-xl mx-auto space-y-4">
        {filmer.map((movie) => (
          <li
            key={movie._id}
            className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition"
          >
            <strong className="text-lg text-gray-800">{movie.title}</strong>
            <span className="text-gray-600">
              : {movie.description}, {movie.year}
            </span>
            <button
              onClick={() => deleteMovie(movie._id)}
              className="ml-4 text-sm text-red-500 hover:underline cursor-pointer"
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movielist;
