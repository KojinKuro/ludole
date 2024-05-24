

describe('basic function check', () => {
  it('is server running? are tests working?', () => {
    cy.visit('http://127.0.0.1:5173/')
  })
})

describe('Landing page game sad paths.', () => {
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5173/')
  })
  it('As a user if I make a guess that is not currently in the possible titles, I will receive a message that my guess is invalid.', () => {
    cy.get('input')
    .type('hello')
    cy.get('button')
    .click()
    cy.get('#game > :nth-child(3)')
    .should('contain', 'Could not find your game')
  })
})