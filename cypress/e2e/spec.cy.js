

describe("basic function check", () => {
  it("is server running? are tests working?", () => {
    cy.visit("http://127.0.0.1:5173/");
  });
});

describe("Landing page game.", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://ludole-api.onrender.com/api/v1/game",{
      statusCode: 200,
      fixture: 'game.json'
    });
    cy.visit("http://127.0.0.1:5173/");
  });
  it("As a user if I make a guess that is not currently in the possible titles, my guess will not be processed.", () => {
    cy.get("input").type("hello").get("button").click();
    cy.get(".guess-container > :nth-child(1)")
      .invoke("attr", "class")
      .should("contain", "grey");
  });
  it("As a user once I make an acceptable guess this should be reflected on the page.", () => {
    cy.get("h2")
      .should("contain", "0/8")
      .get("input")
      .type("The Elder Scrolls V: Skyrim")
      .get("button")
      .click()
      .get("h2")
      .should("contain", "1/8");
  });
  it("If I have not made a guess, the image should be fully blurred", () => {
    cy.get("img").invoke("attr", "style").should("contain", "50px");
  });
});


describe('Correct guesses tests',()=>{
  beforeEach(()=>{
    cy.intercept('GET', 'https://ludole-api.onrender.com/api/v1/game',{
      statusCode: 200,
      fixture: 'game.json'
    });
    cy.visit('http://127.0.0.1:5173/testing')
    .get('input')
    .type("Super Mario World")
    .get('button')
    .click();
  });
  it('If I make a correct guess, the image should no longer be blurred.',()=>{
    cy.get('img')
    .invoke('attr','style')
    .should('contain', 'blur(0px)');
  });
  it('If I make a correct guess, the text should change from Attempts to Solved',()=>{
    cy.get('h2')
    .should('contain', 'Solved');
  });
  it('As a user if I guess correctly my guess should highlight in green.',()=>{
    cy.get('.guess-container > :nth-child(1)')
    .invoke('attr','class')
    .should('contain', 'green');
  });
  it('If I have already solved the puzzle trying to guess again should not be possible',()=>{
    cy.get('input')
    .type("The Elder Scrolls V: Skyrim")
    .get('button')
    .click()
    .get('.guess-container > :nth-child(2)')
    .invoke('attr','class')
    .should('contain', 'grey');
  });
});

describe('Incorrect or partially correct guesses.',()=>{
  beforeEach(()=>{
    cy.intercept('GET', 'https://ludole-api.onrender.com/api/v1/game',{
      statusCode: 200,
      fixture: 'game.json'
    });
    cy.visit('http://127.0.0.1:5173/testing')
  });
  it('As a user if I guess close, my guess should show up in blue on the attempts table.',()=>{
    cy.get('input')
    .type("Super Mario World 2: Yoshi's Island")
    .get('button')
    .click()
    .get('.guess-container > :nth-child(1)')
    .invoke('attr','class')
    .should('contain', 'blue');
  });
  it('If I guess very wrong, my guess should show up in red in the attempts table.',()=>{
    cy.get('input')
    .type("Steins;Gate")
    .get('button')
    .click()
    .get('.guess-container > :nth-child(1)')
    .invoke('attr','class')
    .should('contain', 'red');
  });
  it('If I make multiple wrong guesses, the attempts counter should reflect that.',()=>{
    cy.get('input')
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .get("h2")
    .should("contain", "3/8")
  });
  it('If I lose the game by maxing out attempts, I should not be able to guess anymore',()=>{
    cy.get('input')
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .type("Steins;Gate")
    .get('button')
    .click()
    .get("h2")
    .should("contain", "You Lose, Game Over!")
  })
});

describe('Network Errors', ()=>{
  beforeEach(()=>{
    cy.intercept('GET', 'https://ludole-api.onrender.com/api/v1/game',{
      statusCode: 500
    });
    cy.visit('http://127.0.0.1:5173/testing')
  });
  it('As a user if the request to load games fails, I should see an error message as a user.',()=>{
    cy.get('#root > div')
    .contains("Error: Oops, something went wrong! Please reload the page.")
  })
});
