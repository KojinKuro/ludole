export function findGameObject(title, games) {
  return games.find((game) => game.title.toLowerCase() === title.toLowerCase());
}
