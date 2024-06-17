export function createGuess(name, amount) {
  return [name, parseInt(amount)];
}

export function compareGuesses(guess, answer) {
  if (!guess || !answer) return 0;
  if (guess.game_id === answer.game_id) return 100;

  // we test for 7 categories and 7 * 14.28... = 100
  const MAX_CATEGORY_POINTS = 14.2857143;
  let pointTotal = 0;

  const calculateSimilarity = (comparisonArray, targetArray) => {
    return (
      comparisonArray.filter((item) => targetArray.includes(item)).length /
      targetArray.length
    );
  };

  pointTotal +=
    MAX_CATEGORY_POINTS *
    calculateSimilarity(guess.title.split(" "), answer.title.split(" "));
  pointTotal +=
    MAX_CATEGORY_POINTS * calculateSimilarity(guess.genre, answer.genre);
  pointTotal +=
    MAX_CATEGORY_POINTS * calculateSimilarity(guess.themes, answer.themes);
  pointTotal +=
    MAX_CATEGORY_POINTS * calculateSimilarity(guess.console, answer.console);
  pointTotal +=
    MAX_CATEGORY_POINTS *
    calculateSimilarity(guess.developer, answer.developer);
  pointTotal +=
    MAX_CATEGORY_POINTS *
    calculateSimilarity(guess.publisher, answer.publisher);
  if (guess.year === answer.year) pointTotal += MAX_CATEGORY_POINTS;

  return Math.round(pointTotal);
}
