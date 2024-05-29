describe('Game post page', () => {
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5173/addgame')
    .get('[placeholder="Game Title"]')
    .type('Game')
    .get('[placeholder="Image URL"]')
    .type('website')
    .get('[type="number"]')
    .type('1802')
    .get('[placeholder="Game Genre"]')
    .type('Fun')
    .get('[placeholder="Game Theme"]')
    .type('Silly')
    .get('[placeholder="Game Console"]')
    .type('PC')
    .get('[placeholder="Developer"]')
    .type('Me!')
  });
  it('As a user if I submit a game with all the fields filled out my submission should be succesful.', () => {
    cy.get('[placeholder="Publisher"]')
    .type('My best friend!')
  });
})