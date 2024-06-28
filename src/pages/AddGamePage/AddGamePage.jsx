import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { isNumber } from "chart.js/helpers";
import { useReducer } from "react";
import { useErrorBoundary } from "react-error-boundary";

import FormDisplay from "../../components/FormDisplay/FormDisplay";
import { postGame } from "../../javascript/apiCalls";
import { isValidImageURL } from "../../javascript/image";
import "./AddGamePage.css";

const initialState = {
  formData: {
    title: "",
    imagesrc: "",
    year: new Date().getFullYear(),
    genre: "",
    themes: "",
    console: "",
    developer: "",
    publisher: "",
  },
  formattedFormData: {
    title: "",
    imagesrc: "",
    year: new Date().getFullYear(),
    genre: [],
    themes: [],
    console: [],
    developer: [],
    publisher: [],
  },
  isError: {
    title: null,
    imagesrc: null,
    year: false,
    genre: null,
    themes: null,
    console: null,
    developer: null,
    publisher: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FORM_CHANGE":
      const { name, value } = action.payload;

      let formattedValue;
      let errorResult;
      switch (name) {
        case "year":
          formattedValue = parseInt(value);
          errorResult = !isNumber(formattedValue);
          break;
        case "genre":
        case "themes":
        case "console":
        case "developer":
        case "publisher":
          formattedValue = value
            .split(",")
            .map((data) => data.trim())
            .filter((data) => data !== "");
          errorResult = formattedValue.length === 0;
          break;
        case "imagesrc":
          formattedValue = value;
          errorResult = !action.payload.validImage;
          break;
        default:
          formattedValue = value;
          errorResult = value === "";
          break;
      }

      return {
        formData: {
          ...state.formData,
          [name]: value,
        },
        formattedFormData: {
          ...state.formattedFormData,
          [name]: formattedValue,
        },
        isError: {
          ...state.isError,
          [name]: errorResult,
        },
      };
    case "CLEAR_FORM":
      return initialState;
    default:
      return state;
  }
}

export default function AddGame() {
  const { showBoundary } = useErrorBoundary();
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "imagesrc") {
      isValidImageURL(value).then((validImage) => {
        dispatch({ type: "FORM_CHANGE", payload: { name, value, validImage } });
      });
    } else {
      dispatch({ type: "FORM_CHANGE", payload: { name, value } });
    }
  }

  function submitGame(e) {
    e.preventDefault();
    postGame(state.formattedFormData)
      .then(() => dispatch({ type: "CLEAR_FORM" }))
      .catch(showBoundary);
  }

  function disableButton() {
    const { isError } = state;
    const errorKeys = Object.keys(isError);
    const errorList = errorKeys.filter((key) => isError[key] !== false);
    return Boolean(errorList.length !== 0);
  }

  return (
    <Flex direction="column">
      <Heading textAlign="center">Add Your Own Game</Heading>
      <SimpleGrid columns={2}>
        <FormDisplay formData={state.formattedFormData} />
        <Stack as="form" className="form">
          <FormControl isRequired isInvalid={state.isError.title}>
            <FormLabel>Game Title</FormLabel>
            {!state.isError.title ? (
              <FormHelperText>Enter a game title</FormHelperText>
            ) : (
              <FormErrorMessage>Game title is required.</FormErrorMessage>
            )}
            <Input
              type="text"
              placeholder="Game Title"
              name="title"
              onChange={handleChange}
              value={state.formData.title}
            />
          </FormControl>
          <FormControl isRequired isInvalid={state.isError.imagesrc}>
            <FormLabel>Image URL</FormLabel>
            {!state.isError.imagesrc ? (
              <FormHelperText>Input an image URL</FormHelperText>
            ) : (
              <FormErrorMessage>This image URL is not valid.</FormErrorMessage>
            )}
            <Input
              type="text"
              placeholder="Image URL"
              name="imagesrc"
              onChange={handleChange}
              value={state.formData.imagesrc}
            />
          </FormControl>
          <FormControl isRequired isInvalid={state.isError.year}>
            <FormLabel>Release Year</FormLabel>
            {!state.isError.year ? (
              <FormHelperText>Input a year number</FormHelperText>
            ) : (
              <FormErrorMessage>This year is not valid.</FormErrorMessage>
            )}
            <Input
              type="number"
              placeholder="Year Released"
              name="year"
              onChange={handleChange}
              value={state.formData.year}
            />
          </FormControl>
          <FormControl isRequired isInvalid={state.isError.genre}>
            <FormLabel>Genre(s)</FormLabel>
            {!state.isError.genre ? (
              <FormHelperText>
                Enter genres in the syntax: genre1, genre2, genre3, ...
              </FormHelperText>
            ) : (
              <FormErrorMessage>At least 1 genre is required.</FormErrorMessage>
            )}
            <Input
              name="genre"
              type="text"
              placeholder="Game Genre"
              onChange={handleChange}
              value={state.formData.genre}
            />
          </FormControl>
          <FormControl isRequired isInvalid={state.isError.themes}>
            <FormLabel>Theme(s)</FormLabel>
            {!state.isError.themes ? (
              <FormHelperText>
                Enter themes in the syntax: theme1, theme2, theme3, ...
              </FormHelperText>
            ) : (
              <FormErrorMessage>At least 1 theme is required.</FormErrorMessage>
            )}
            <Input
              name="themes"
              type="text"
              placeholder="Game Theme"
              onChange={handleChange}
              value={state.formData.themes}
            />
          </FormControl>
          <FormControl isRequired isInvalid={state.isError.console}>
            <FormLabel>Console(s)</FormLabel>
            {!state.isError.console ? (
              <FormHelperText>
                Enter consoles in the syntax: console1, console2, console3, ...
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                At least 1 console is required.
              </FormErrorMessage>
            )}
            <Input
              name="console"
              type="text"
              placeholder="Game Console"
              onChange={handleChange}
              value={state.formData.console}
            />
          </FormControl>
          <FormControl isRequired isInvalid={state.isError.developer}>
            <FormLabel>Developer(s)</FormLabel>
            {!state.isError.developer ? (
              <FormHelperText>
                Enter developers in the syntax: developer1, developer2,
                developer3, ...
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                At least 1 developer is required.
              </FormErrorMessage>
            )}
            <Input
              name="developer"
              type="text"
              placeholder="Developer"
              onChange={handleChange}
              value={state.formData.developer}
            />
          </FormControl>
          <FormControl isRequired isInvalid={state.isError.publisher}>
            <FormLabel>Publisher(s)</FormLabel>
            {!state.isError.publisher ? (
              <FormHelperText>
                Enter publishers in the syntax: publisher1, publisher2,
                publisher3, ...
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                At least 1 publisher is required.
              </FormErrorMessage>
            )}
            <Input
              name="publisher"
              type="text"
              placeholder="Publisher"
              onChange={handleChange}
              value={state.formData.publisher}
            />
          </FormControl>
          <Button
            onClick={submitGame}
            colorScheme="purple"
            className="submit-button"
            isDisabled={disableButton()}
          >
            Submit Game
          </Button>
          <div id="success"></div>
        </Stack>
      </SimpleGrid>
    </Flex>
  );
}
