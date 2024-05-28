import { useState } from "react";

export default function AddGame() {
  const [newGame, setNewGame] = useState({
    title: "",
    imagesrc: "",
    year: 2023,
    genre: [],
    themes: [],
    console: [],
    developer: [],
    publisher: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Array.isArray(newGame[name])) {
      setNewGame((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData[name], value], 
      }));
    } else {
      setNewGame((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }
  console.log(formData)
  return (
    <div className="add-game">
        <h1>Add Your Own Game</h1>
        <form className="form">
            <input 
            type="text"
            placeholder="Game Title"
            name="title"
            onChange={handleChange}
            value={FormData.title}
            />
             <input 
            type="text"
            placeholder="Image URL"
            name="imagesrc"
            onChange={handleChange}
            value={FormData.imagesrc}
            />
             <input 
            type="number"
            placeholder="Year Released"
            name="year"
            onChange={handleChange}
            value={FormData.year}
            />
             <input 
            type="text"
            placeholder="Add a Genre"
            name="genre"
            onChange={handleChange}
            value={FormData.genre}
            />
            <input 
            type="text"
            placeholder="Add a Theme"
            name="themes"
            onChange={handleChange}
            value={FormData.themes}
            />
            <input 
            type="text"
            placeholder="Add a Console"
            name="console"
            onChange={handleChange}
            value={FormData.console}
            />
            <input 
            type="text"
            placeholder="Developer"
            name="developer"
            onChange={handleChange}
            value={FormData.developer}
            />
            <input 
            type="text"
            placeholder="Publisher"
            name="publisher"
            onChange={handleChange}
            value={FormData.publisher}
            />
            <button>Submit Game</button>
        </form>
    </div>
  )
}
