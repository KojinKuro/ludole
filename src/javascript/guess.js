export function createGuess(name, amount) {
  return [name, parseInt(amount)];
}

export function compareGuesses(guessGame, correctGame) {
  if (!guessGame || !correctGame) return 0;
  if (guessGame.id === correctGame.id) return 100;
  // we test for 7 categories and 7 * 14 = 98 which is the closest to 100
  const MAX_CATEGORY_POINTS = 14;
  let pointTotal = 0;

  const calculateSimilarityRatio = (category) => {
    return (
      guessGame[category].filter((item) => correctGame[category].includes(item))
        .length / correctGame[category].length
    );
  };

  // get point totals
  const TITLE_SIMILARITY_RATIO =
    guessGame.title
      .split(" ")
      .filter((word) => correctGame.title.includes(word)).length /
    correctGame.title.split(" ").length;
  pointTotal += MAX_CATEGORY_POINTS * TITLE_SIMILARITY_RATIO;

  if (guessGame.year === correctGame.year) pointTotal += MAX_CATEGORY_POINTS;

  pointTotal += MAX_CATEGORY_POINTS * calculateSimilarityRatio("genre");
  pointTotal += MAX_CATEGORY_POINTS * calculateSimilarityRatio("themes");
  pointTotal += MAX_CATEGORY_POINTS * calculateSimilarityRatio("console");
  pointTotal += MAX_CATEGORY_POINTS * calculateSimilarityRatio("developer");
  pointTotal += MAX_CATEGORY_POINTS * calculateSimilarityRatio("publisher");

  return pointTotal;
}
