/**
 * Ideally all this E2E tests should run against staging or mock data
 * but for the purpose of this task this is fine
 */
describe('workouts-app', () => {
  beforeEach(() => cy.visit('/workouts/1'));

  it('has the global header', () => {
    cy.get('nav').should('be.visible');

    cy.get('nav').find('svg').should('be.visible');
    cy.get('nav')
      .find('a[href="/"]')
      .should('be.visible')
      .should('not.have.class', 'active');
  });

  // Just a simple test to validate that all content is present
  it('contains the right information', () => {
    cy.get('[data-test-id="workout-page-title"]')
      .should('be.visible')
      .should('not.be.empty');
    cy.get('[data-test-id="workout-page-image"]').should('be.visible');
    cy.get('[data-test-id="workout-page-category"]')
      .should('be.visible')
      .should('not.be.empty');
    cy.get('[data-test-id="workout-page-start-date"]')
      .should('be.visible')
      .should('not.be.empty');
    cy.get('[data-test-id="workout-page-description"]')
      .should('be.visible')
      .should('not.be.empty');
  });

  it('should navigate back to the workouts page', () => {
    cy.get('[data-test-id="back-link"]')
      .should('contain.text', 'Back to Workouts')
      .click();
    cy.url().should('eql', 'http://localhost:4200/');
  });
});
