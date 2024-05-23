function ImageRender({gameImage, guessNumber }){
     //if you want to see the css trigger when working on integrating this with props uncomment below.
    //  guessNumber = 0 
    return (
    <div className="blur-overflow">
        <img alt='game-image' className="game-img" id={`guess-${guessNumber}`}src={`${gameImage}`}></img>
    </div>
    );
};
export default ImageRender;


//https://www.kalmbachfeeds.com/cdn/shop/articles/two-white-ducks-in-grass.jpg?v=1706873608 sample image to plug into src if you would like to see it working,