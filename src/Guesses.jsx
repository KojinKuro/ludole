import "./Guesses.css";

//basing this off data from guessArray coming in to be ['guess string', '25' - 25 being the percentage correct] - Hopefully that works

export default function Guesses({ guessArray = [] }) {
  const MAX_GUESSES = 8;
  if (guessArray.length > MAX_GUESSES) return;

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

  const emptyBoxNumber = MAX_GUESSES - guessArray.length;
  const boxes = [...guessArray, ...Array(emptyBoxNumber).fill(["", 0])];

  const boxElements = boxes.map((box, index) => {
    const [guess, numberStr] = box;
    const number = parseInt(numberStr);
    return (
      <div key={index}>
        <div className={`box ${getColorClass(number)}`}>{guess}</div>
      </div>
    )
  })

  return <div className="container">{boxElements}</div>;
}
