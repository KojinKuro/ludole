describe("basic function check", () => {
  it("is server running? are tests working?", () => {
    cy.visit("http://127.0.0.1:5173/");
  });
});

describe("Direct Url Navigation.", () => {
  it("As a user, the default path should land me on the homepage game.", () => {
    cy.visit("http://127.0.0.1:5173/").get(".guess-container > :nth-child(1)");
  });
  it("If I go to the path /about I should be taken to a page describing the game and its developers.", () => {
    cy.visit("http://127.0.0.1:5173/about").get("h1").contains("About");
  });
  it("If I go to the path /howto, I should be taken to a page describing how to play.", () => {
    cy.visit("http://127.0.0.1:5173/howto").get("h1").contains("How to");
  });
  it("If I go to a made up path, it should take me to the landing page", () => {
    cy.visit("http://127.0.0.1:5173/abofdsffut").get(
      ".guess-container > :nth-child(1)"
    );
  });
  it("If I go to the path /addgame, it will take me to the submissions page.", () => {
    cy.visit("http://127.0.0.1:5173/addgame").get('[placeholder="Game Title"]');
  });
});

describe("Click Navigation.", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });
  it("As a user, if I click the i icon I should be taken to the about page.", () => {
    cy.get('[href="/about"] > box-icon').click().get("h1").contains("About");
  });
  it("As a user, if I click the question-mark I will be taken to the how to play page.", () => {
    cy.get('[href="/howto"] > box-icon').click().get("h1").contains("How to");
  });
  it("As a user, if I click the Ludole logo I should be taken back to the home page.", () => {
    cy.visit("http://127.0.0.1:5173/howto")
      .get('[href="/"] > box-icon')
      .click()
      .get(".guess-container > :nth-child(1)");
  });
  it('As a user, if I click the rightmost icon it should take me to the submissions page',()=>{
    cy.get('[href="/addgame"] > box-icon')
    .click()
    .get('[placeholder="Game Title"]');
  });
});
