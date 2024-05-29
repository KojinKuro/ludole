import { useState } from "react";
import "./AddGame.css"

export default function AddGame() { //pass setter function in for allGames as prop
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

//   const submitGame = (e) => {
//     e.preventDefault() 
//     post request will live here
//     along with setter function for adding the returned data to 
//     our all games state. 
//   }

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
        <input
          type="text"
          placeholder="Game Genre"
          onBlur={(e) => handleArrayChange(e, "genre")}
        />
        <input
          type="text"
          placeholder="Game Theme"
          onBlur={(e) => handleArrayChange(e, "themes")}
        />
        <input
          type="text"
          placeholder="Game Console"
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
        {/* <button onClick={submitGame} className="submit-button">Submit Game</button> */}
      </form>
    </div>
  );
}
