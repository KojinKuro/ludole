import { useState, useEffect } from "react";
import "./Guesses.css";

export default function Guesses({ guessArray }) {
  const [boxes, setBoxes] = useState(Array(8).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (guessArray && guessArray.length === 2 && guessArray[0] !== "") {
      const [guess, numberStr] = guessArray;
      const number = parseInt(numberStr);
      console.log("number", number);

      setBoxes((prevBoxes) => {
        const newBoxes = [...prevBoxes];
        newBoxes[currentIndex] = (
          <div className={`box ${getColorClass(number)}`}>{guess}</div>
        );
        return newBoxes;
      });

      setCurrentIndex((prevIndex) => (prevIndex + 1) % 8);
    }
  }, [guessArray]);

  const getColorClass = (number) => {
    if (number === 0) {
      return "grey";
    } else if (number >= 1 && number <= 25) {
      return "red";
    } else if (number >= 26 && number <= 50) {
      return "yellow";
    } else if (number >= 51 && number <= 75) {
      return "blue";
    } else if (number >= 76 && number <= 99) {
      return "green";
    }
  };

  return (
    <div className="container">
      {" "}
      {/* Apply the container class */}
      {boxes.map((box, index) => (
        <div key={index} className="box">
          {box}
        </div>
      ))}
    </div>
  );
}
