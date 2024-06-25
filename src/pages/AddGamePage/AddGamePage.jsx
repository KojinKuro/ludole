import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import FormDisplay from "../../components/FormDisplay/FormDisplay";
import { postGame } from "../../javascript/apiCalls";
import "./AddGamePage.css";

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
    <Flex direction="column">
      <Heading textAlign="center">Add Your Own Game</Heading>
      <SimpleGrid columns={2}>
        <FormDisplay formData={formData} />
        <Container as="form" className="form">
          <FormControl isRequired>
            <FormLabel>Game Title</FormLabel>
            <Input
              type="text"
              placeholder="Game Title"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              placeholder="Image URL"
              name="imagesrc"
              onChange={handleChange}
              value={formData.imagesrc}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Year</FormLabel>
            <Input
              type="number"
              placeholder="Year Released"
              name="year"
              onChange={handleChange}
              value={formData.year}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Genre(s)</FormLabel>
            <Input
              id="1"
              type="text"
              placeholder="Game Genre"
              onBlur={(e) => handleArrayChange(e, "genre")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Theme(s)</FormLabel>
            <Input
              id="2"
              type="text"
              placeholder="Game Theme"
              onBlur={(e) => handleArrayChange(e, "themes")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Console(s)</FormLabel>
            <Input
              id="3"
              type="text"
              placeholder="Game Console"
              onBlur={(e) => handleArrayChange(e, "console")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Developer(s)</FormLabel>
            <Input
              id="4"
              type="text"
              placeholder="Developer"
              onBlur={(e) => handleArrayChange(e, "developer")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Publisher(s)</FormLabel>
            <Input
              id="5"
              type="text"
              placeholder="Publisher"
              onBlur={(e) => handleArrayChange(e, "publisher")}
            />
          </FormControl>

          <Button
            onClick={submitGame}
            colorScheme="purple"
            className="submit-button"
            ali
          >
            Submit Game
          </Button>
          <div id="success"></div>
        </Container>
      </SimpleGrid>
    </Flex>
  );
}
