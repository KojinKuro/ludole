describe("basic function check", () => {
  it("is server running? are tests working?", () => {
    cy.visit("http://127.0.0.1:5173/");
  });
});

describe("Landing page game.", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });
  it("As a user if I make a guess that is not currently in the possible titles, my guess will not be processed.", () => {
    cy.get("input").type("hello").get("button").click();
    cy.get(".guess-container > :nth-child(1)")
      .invoke("attr", "class")
      .should("contain", "grey");
  });
  it("As a user once I make an acceptable guess this should be reflected on the page.", () => {
    cy.get("input")
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


//The below code will be available to implement once we have api calls to intercept, it was tested by editing mock data to only include the first .
describe('Correct guesses tests',()=>{
  beforeEach(()=>{
    //get intercept goes here
    cy.visit('http://127.0.0.1:5173/testing')
    .get('input')
    .type("The Elder Scrolls V: Skyrim")
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
