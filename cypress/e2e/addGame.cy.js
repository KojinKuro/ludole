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
    cy.intercept('POST', 'https://ludole-api.onrender.com/api/v1/game',{
      statusCode: 201,
      body: {
        "id" : 89009,
        "title" : "Game",
        "imagesrc": "website",
        "year": 1802,
        "genre": ["Fun"],
        "themes": ["Silly"],
        "console": ["PC"],
        "developer": ["Me!"],
        "publisher": ["My best friend!"]
      }
    });
    cy.get('[placeholder="Publisher"]')
    .type('My best friend!')
    .get('button')
    .click()
    .get('#success')
    .contains('Game Successfully Submitted')
  });
  it('If I get an error when posting I should see that reflected on the page.',()=>{
    cy.intercept('POST', 'https://ludole-api.onrender.com/api/v1/game',{
      statusCode: 422
    });
    cy.get('button')
    .click()
    .get('#success')
    .contains('There was a problem submitting your game')
  });
});