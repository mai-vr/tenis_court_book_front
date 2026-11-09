describe("E2E Authentication Tests (Login)", () => {
  it("Should log in successfully and redirect to home", () => {
    cy.intercept("POST", "*login*", {
      statusCode: 200,
      body: {
        token: "fake-jwt-token-abc",
        user: { name: "Tennis Player" },
      },
    }).as("loginRequest");

    cy.visit("http://localhost:5173/login");

    cy.get('input[name="email"]').type("test@tennis.com");
    cy.get('input[name="password"]').type("password123");

    cy.contains("button", "Log in").click();

    cy.url().should("eq", "http://localhost:5173/");
  });

  it("Should display an error message if credentials fail", () => {
    cy.intercept("POST", "**/api/login", {
      statusCode: 401,
      body: { message: "Invalid email or password" },
    }).as("loginErrorRequest");

    cy.visit("http://localhost:5173/login");

    cy.get('input[name="email"]').type("wrong@tennis.com");
    cy.get('input[name="password"]').type("badpass");

    cy.contains("button", "Log in").click();

    cy.get(".login__error").should("be.visible");
  });
});
