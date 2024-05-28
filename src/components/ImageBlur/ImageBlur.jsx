import "./ImageBlur.css";
import PropTypes from "prop-types";

export default function ImageBlur({
  src,
  blur = 1,
  width = "300px",
  height = width,
  alt,
}) {
  const BLUR_FACTOR = 500;
  const blurAmount = (parseInt(width.split("px")) * blur) / BLUR_FACTOR;

  return (
    <div className="image-container">
      <img src={src} alt={alt} style={{ filter: `blur(${blurAmount}px)` }} />
    </div>
  );
}

ImageBlur.propTypes = {
  src: PropTypes.string.isRequired,
  blur: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

//https://www.kalmbachfeeds.com/cdn/shop/articles/two-white-ducks-in-grass.jpg?v=1706873608 sample image to plug into src if you would like to see it working,
