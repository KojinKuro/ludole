import { useState } from "react";

export default function AddGame() {
  const [newGame, setNewGame] = useState({
    title: "",
    imagesrc: "",
    year: "",
    genre: [],
    themes: [],
    console: [],
    developer: [],
    publisher: [],
  });

  const handleChange = (e) => {
    const newValue =
      e.target.name === "year" ? parseInt(e.target.value) : e.target.value;
    setNewGame((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: newValue,
      };
    });
  };

  const handleArrayChange = (e, name) => {
    const { value } = e.target;
    if (value) {
      setNewGame((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData[name], value],
      }));
    }
  };
  console.log('game', newGame);
  return (
    <div className="add-game">
      <h1>Add Your Own Game</h1>
      <form className="form">
        <input
          type="text"
          placeholder="Game Title"
          name="title"
          onChange={handleChange}
          value={newGame.title}
        />
        <input
          type="text"
          placeholder="Image URL"
          name="imagesrc"
          onChange={handleChange}
          value={newGame.imagesrc}
        />
        <input
          type="number"
          placeholder="Year Released"
          name="year"
          onChange={handleChange}
          value={newGame.year}
        />
        {/* <input 
            type="text"
            placeholder="Add a Genre"
            name="genre"
            onChange={handleChange}
            value={newGame.genre}
            /> */}
        <input
          type="text"
          placeholder="Add Genre"
          onBlur={(e) => handleArrayChange(e, "genre")}
        />
        <input
          type="text"
          placeholder="Add a Theme"
          onBlur={(e) => handleArrayChange(e, "themes")}
        />
        <input
          type="text"
          placeholder="Add a Console"
          onBlur={(e) => handleArrayChange(e, "console")}
        />
        <input
          type="text"
          placeholder="Developer"
          onBlur={(e) => handleArrayChange(e, "developer")}
        />
        <input
          type="text"
          placeholder="Publisher"
          onBlur={(e) => handleArrayChange(e, "publisher")}
        />
        <button>Submit Game</button>
      </form>
    </div>
  );
}
