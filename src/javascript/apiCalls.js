function getGames(){
    return fetch('http://localhost:8000/api/v1/game');
};
export {getGames};