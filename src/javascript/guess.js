export function createGuess(name, amount) {
  return [name, parseInt(amount)];
}

export function compareGuesses(guess, answer) {
  if (!guess || !answer) return 0;
  if (guess.id === answer.id) return 100;

  // we test for 7 categories and 7 * 14 = 98 which is the closest to 100
  const MAX_POINTS = 14;
  let points = 1;

  const calculateSimilarity = (comparisonArray, targetArray) => {
    return (
      comparisonArray.filter((item) => targetArray.includes(item)).length /
      targetArray.length
    );
  };

  points +=
    MAX_POINTS *
    calculateSimilarity(guess.title.split(" "), answer.title.split(" "));
  points += MAX_POINTS * calculateSimilarity(guess.genre, answer.genre);
  points += MAX_POINTS * calculateSimilarity(guess.themes, answer.themes);
  points += MAX_POINTS * calculateSimilarity(guess.console, answer.console);
  points += MAX_POINTS * calculateSimilarity(guess.developer, answer.developer);
  points += MAX_POINTS * calculateSimilarity(guess.publisher, answer.publisher);
  if (guess.year === answer.year) points += MAX_POINTS;

  return points;
}
