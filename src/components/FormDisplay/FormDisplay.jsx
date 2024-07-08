import {
  Card,
  Heading,
  Image,
  ListItem,
  Skeleton,
  UnorderedList,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { isValidImageURL } from "../../utils/image";

export default function FormDisplay({ formData }) {
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    isValidImageURL(formData.imagesrc).then(setImageExists);
  }, [formData]);

  return (
    <Card>
      <Heading>
        {formData.title} ({formData.year})
      </Heading>
      <Skeleton isLoaded={imageExists}>
        <Image
          width="100%"
          height="100%"
          aspectRatio={"1/1"}
          src={formData.imagesrc}
        />
      </Skeleton>

      <Heading size="md">Genre</Heading>
      <UnorderedList>
        {formData.genre.map((genre) => (
          <ListItem key={genre}>{genre}</ListItem>
        ))}
      </UnorderedList>

      <Heading size="md">Themes</Heading>
      <UnorderedList>
        {formData.themes.map((genre) => (
          <ListItem key={genre}>{genre}</ListItem>
        ))}
      </UnorderedList>

      <Heading size="md">Console</Heading>
      <UnorderedList>
        {formData.console.map((genre) => (
          <ListItem key={genre}>{genre}</ListItem>
        ))}
      </UnorderedList>

      <Heading size="md">Developer</Heading>
      <UnorderedList>
        {formData.developer.map((genre) => (
          <ListItem key={genre}>{genre}</ListItem>
        ))}
      </UnorderedList>

      <Heading size="md">Publisher</Heading>
      <UnorderedList>
        {formData.publisher.map((genre) => (
          <ListItem key={genre}>{genre}</ListItem>
        ))}
      </UnorderedList>
    </Card>
  );
}

FormDisplay.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string,
    imagesrc: PropTypes.string,
    year: PropTypes.number,
    genre: PropTypes.arrayOf(PropTypes.string),
    themes: PropTypes.arrayOf(PropTypes.string),
    console: PropTypes.arrayOf(PropTypes.string),
    developer: PropTypes.arrayOf(PropTypes.string),
    publisher: PropTypes.arrayOf(PropTypes.string),
  }),
};
