
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
  it('As a user once I make an acceptable guess this should be reflected on the page.', ()=>{
    cy.get('input')
    .type("Super Mario World 2: Yoshi's Island")
    cy.get('button')
    .click()
    cy.get('h2')
    .should('contain', 'Attempts 1/8')
  })

});
//The below code will be available to implement once we have api calls to intercept.
/**  it('As a user if I guess correctly my guess should highlight in green.',()=>{
    cy.get('input')
    .type("Super Mario World 2: Yoshi's Island")
    cy.get('button')
    .click()
    cy.get('.guess-container > :nth-child(1)')
    .invoke('attr','class')
    .should('contain', 'green')
  }) */