import "./ImageBlur.css";

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
    <div style={{ width, height }} className="image-container">
      <img src={src} alt={alt} style={{ filter: `blur(${blurAmount}px)` }} />
    </div>
  );
}

//https://www.kalmbachfeeds.com/cdn/shop/articles/two-white-ducks-in-grass.jpg?v=1706873608 sample image to plug into src if you would like to see it working,
