import { Box, Container, Img, Skeleton } from "@chakra-ui/react";
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
    <Skeleton width={size} height={size} isLoaded={src !== undefined}>
      <Container className="image-container" p={0} width={size} height={size}>
        <Img
          src={src}
          alt={alt}
          width={size}
          height={size}
          style={{ filter: `blur(${blurAmount}px)` }}
        />
      </Container>
    </Skeleton>
  );
}

ImageBlur.propTypes = {
  src: PropTypes.string,
  blur: PropTypes.number,
  size: PropTypes.string,
  alt: PropTypes.string,
};

//https://www.kalmbachfeeds.com/cdn/shop/articles/two-white-ducks-in-grass.jpg?v=1706873608 sample image to plug into src if you would like to see it working,
