import { useState } from "react";

type AddMovieFormProps = {
  onAdd?: () => void;
};

function AddMovieForm({ onAdd }: AddMovieFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMovie = { title, description };

    // Skicka till backend
    const res = await fetch("http://localhost:5000/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      onAdd && onAdd();
    } else {
      alert("Något gick fel!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "2rem" }}
      className="color-gray-800 bg-gray-100 border rounded my-5 py-5 flex flex-col items-start"
    >
      <div className="ml-5 flex flex-col items-start">
        <h3>Add a new movie:</h3>
        <div>
          <label className="mr-2">Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded bg-white my-2"
            required
          />
        </div>
        <div>
          <label className="mr-2">Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded bg-white"
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-white p-2 my-3 border rounded cursor-pointer hover:bg-gray-200 "
        >
          Add movie
        </button>
      </div>
    </form>
  );
}

export default AddMovieForm;
