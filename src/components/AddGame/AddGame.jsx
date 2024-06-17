import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { postGame } from "../../javascript/apiCalls";
import "./AddGame.css";

export default function AddGame({ addNewGame }) {
  //pass setter function in for allGames as prop
  const [formData, setFormData] = useState({
    title: "",
    imagesrc: "",
    year: "",
    genre: [],
    themes: [],
    console: [],
    developer: [],
    publisher: [],
  });

  console.log(formData);

  function handleChange(e) {
    const newValue =
      e.target.name === "year" ? parseInt(e.target.value) : e.target.value;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: newValue,
      };
    });
  }

  function handleArrayChange(e, name) {
    const string = e.target.value;
    if (string !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: string.split(","),
      }));
    }
  }

  function submitGame(e) {
    e.preventDefault();
    const newGame = formData;
    postGame(newGame)
      .then((res) => {
        if (res.ok) {
          document.getElementById("success").innerText =
            "Game Successfully Submitted";
          return res.json();
        } else {
          throw new Error("Oops, something went wrong!");
        }
      })
      .then((data) => {
        addNewGame(data);
        clearForm();
      })
      .catch((err) => {
        document.getElementById("success").innerText =
          "There was a problem submitting your game";
        console.error(err);
      });
  }

  function clearForm() {
    setFormData({
      title: "",
      imagesrc: "",
      year: "",
      genre: [],
      themes: [],
      console: [],
      developer: [],
      publisher: [],
    });
    document.querySelector('input[id="1"]').value = "";
    document.querySelector('input[id="2"]').value = "";
    document.querySelector('input[id="3"]').value = "";
    document.querySelector('input[id="4"]').value = "";
    document.querySelector('input[id="5"]').value = "";
  }

  // console.log('game', formData);
  return (
    <main className="add-game">
      <h1>Add Your Own Game</h1>
      <form className="form">
        <Input
          type="text"
          placeholder="Game Title"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
        <Input
          type="text"
          placeholder="Image URL"
          name="imagesrc"
          onChange={handleChange}
          value={formData.imagesrc}
        />
        <Input
          type="number"
          placeholder="Year Released"
          name="year"
          onChange={handleChange}
          value={formData.year}
        />
        <Input
          id="1"
          type="text"
          placeholder="Game Genre"
          onBlur={(e) => handleArrayChange(e, "genre")}
        />
        <Input
          id="2"
          type="text"
          placeholder="Game Theme"
          onBlur={(e) => handleArrayChange(e, "themes")}
        />
        <Input
          id="3"
          type="text"
          placeholder="Game Console"
          onBlur={(e) => handleArrayChange(e, "console")}
        />
        <Input
          id="4"
          type="text"
          placeholder="Developer"
          onBlur={(e) => handleArrayChange(e, "developer")}
        />
        <Input
          id="5"
          type="text"
          placeholder="Publisher"
          onBlur={(e) => handleArrayChange(e, "publisher")}
        />
        <Button onClick={submitGame} className="submit-button">
          Submit Game
        </Button>
        <div id="success"></div>
      </form>
    </main>
  );
}
