
describe('basic function check', () => {
  it('is server running? are tests working?', () => {
    cy.visit('http://127.0.0.1:5173/')
  });
});

describe('Direct Url Navigation.', () => {
  it('As a user, the default path should land me on the homepage game.', () => {
    cy.visit('http://127.0.0.1:5173/')
    .get('.guess-container > :nth-child(1)');
  });
  it('If I go to the path /about I should be taken to a page describing the game and its developers.',()=>{
    cy.visit('http://127.0.0.1:5173/about')
    .get('h1')
    .contains('About');
  });
  it('If I go to the path /howto, I should be taken to a page describing how to play.',()=>{
    cy.visit('http://127.0.0.1:5173/howto')
    .get('h1')
    .contains('How to')
  });
  it('If I go to a made up path, it should take me to the landing page',()=>{
    cy.visit('http://127.0.0.1:5173/abofdsffut')
    .get('.guess-container > :nth-child(1)');
  });
});