function getGames(){
    return fetch('https://ludole-api.onrender.com/api/v1/game');
};
export {getGames};