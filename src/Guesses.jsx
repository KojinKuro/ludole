import { useState, useEffect } from "react";
import "./Guesses.css";

//basing this off data from guessArray coming in to be ['guess string', '25' - 25 being the percentage correct] - Hopefully that works

export default function Guesses({ guessArray }) {
  const boxes = Array(8).fill("");

  const getColorClass = (number) => {
    if (number === 0) {
      return "grey";
    } else if (number >= 1 && number <= 25) {
      return "red";
    } else if (number >= 26 && number <= 50) {
      return "yellow";
    } else if (number >= 51 && number <= 75) {
      return "blue";
    } else if (number >= 76 && number <= 100) {
      return "green";
    }
  };

  if (guessArray && guessArray.length === 2 && guessArray[0] !== "") {
    const [guess, numberStr] = guessArray;
    const number = parseInt(numberStr);
    boxes[0] = <div className={`box ${getColorClass(number)}`}>{guess}</div>;
  }

  return (
    <div className="container">
      {boxes.map((box, index) => (
        <div key={index} className="box">
          {box}
        </div>
      ))}
    </div>
  );
}
