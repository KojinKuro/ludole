export function createGuess(name, amount) {
  return [name, parseInt(amount)];
}

// will return a number from 0 to 100
export function compareGuesses(guessGame, correctGame) {
  if (!guessGame || !correctGame) return 0;
  if (guessGame.id === correctGame.id) return 100;

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

/*

  {
    id: 472,
    imagesrc:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnw.webp",

    title: "The Elder Scrolls V: Skyrim",
    year: 2011,
    genre: ["RPG", "Adventure"],
    themes: ["Action", "Fanatasy", "Open world", "Sandbox", "Stealth"],
    console: ["PC", "PlayStation 3", "Xbox 360"],
    developer: ["Bethesda Game Studios"],
    publisher: ["Bethesda Softworks"],
  },

*/
