import { Box, Container, Image, Skeleton } from "@chakra-ui/react";
import PropTypes from "prop-types";
import "./ImageBlur.css";

export default function ImageBlur({
  src,
  blur = 1,
  size = "300px",
  alt = "Video game box cover",
}) {
  const BLUR_FACTOR = 10;
  const blurAmount = (parseInt(size.split("px")) * blur) / BLUR_FACTOR;

  return (
    <Container
      className="image-container"
      p={0}
      width={{ base: "100%", md: size }}
      height={{ base: "70vh", md: size }}
    >
      <Skeleton width="100%" height="100%" isLoaded={src !== undefined}>
        <Image
          src={src}
          alt={alt}
          width={{ base: "100%", md: size }}
          height={{ base: "100%", md: size }}
          style={{ filter: `blur(${blurAmount}px)` }}
        />
      </Skeleton>
    </Container>
  );
}

ImageBlur.propTypes = {
  src: PropTypes.string,
  blur: PropTypes.number,
  size: PropTypes.string,
  alt: PropTypes.string,
};

//https://www.kalmbachfeeds.com/cdn/shop/articles/two-white-ducks-in-grass.jpg?v=1706873608 sample image to plug into src if you would like to see it working,
