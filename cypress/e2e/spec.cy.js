

describe('basic function check', () => {
  it('is server running? are tests working?', () => {
    cy.visit('http://127.0.0.1:5173/')
  })
})

describe('Landing page game.', () => {
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5173/')
  });
  it('As a user if I make a guess that is not currently in the possible titles, I will receive a message that my guess is invalid.', () => {
    cy.get('input')
    .type('hello')
    cy.get('button')
    .click()
    cy.get('#game > :nth-child(3)')
    .should('contain', 'Could not find your game')
  })
  it('As a user if guess incorrectly the attempts counter should tick up, and my guess should populate in red in the attempts.',()=>{
    cy.get('input')
    .type("Super Mario World 2: Yoshi's Island")
    cy.get('button')
    .click()
    cy.get('.guess-container > :nth-child(1)')
    .invoke('attr','class')
    .should('contain', 'red')
  })
});