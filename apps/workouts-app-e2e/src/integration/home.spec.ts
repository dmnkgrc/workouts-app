/**
 * Ideally all this E2E tests should run against staging or mock data
 * but for the purpose of this task this is fine
 */
describe('workouts-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should be able to filter', () => {
    cy.get('[data-test-id="home-title"]').find('p').should('contain', '(1000)');
    cy.get('[data-test-id="workouts-list-element"]').should('have.length', 20);
    cy.get('[data-test-id="pagination"] > p').should(
      'contain.text',
      'Showing 1 to 20 of 1000 workouts',
    );
    cy.get('[data-test-id="filter-menu-categories"').click();
    cy.get('[data-test-id="filter-menu-option')
      .first()
      .should('be.visible')
      .should('have.text', 'c1')
      .click();
    cy.get('[data-test-id="selected-filter"]').should('have.length', 1);
    cy.get('[data-test-id="home-title"]')
      .find('p')
      .should('not.contain', '(1000)');
    cy.get('[data-test-id="pagination"] > p').should(
      'contain.text',
      'Showing 1 to 20 of',
    );
    cy.get('[data-test-id="pagination"] > p').should(
      'not.contain.text',
      'Showing 1 to 20 of 1000 workouts',
    );
    cy.get('[data-test-id="filter-menu-start-month"').click();
    cy.get('[data-test-id="filter-menu-option')
      .first()
      .should('be.visible')
      .click();
    cy.get('[data-test-id="selected-filter"]').should('have.length', 2);
    cy.get('[data-test-id="home-title"]')
      .find('p')
      .should('not.contain', '(1000)');
    cy.get('[data-test-id="home-title"]')
      .find('p')
      .then((p) => {
        const total = Number(p.text().replace('(', '').replace(')', ''));
        if (total <= 20) {
          cy.get('[data-test-id="pagination"]').should('not.be.visible');
          return;
        }
        cy.get('[data-test-id="pagination"] > p').should(
          'contain.text',
          `Showing 1 to 20 of ${total} workouts`,
        );
      });
  });

  it('should be able to paginate', () => {
    cy.get('[data-test-id="pagination"] > p').should(
      'not.contain.text',
      'Showing 1 to 20 of 1000 workouts',
    );
    cy.get('[data-test-id="pagination-previous"]').should('not.be.visible');
    cy.get('[data-test-id="pagination-next"]').should('be.visible').click();
    cy.get('[data-test-id="pagination-previous"]').should('be.visible');
    cy.get('[data-test-id="pagination"] > p').should(
      'contain.text',
      'Showing 21 to 40 of 1000 workouts',
    );
    cy.get('[data-test-id="pagination-50"]').should('be.visible').click();
    cy.get('[data-test-id="pagination-next"]').should('not.be.visible');
    cy.get('[data-test-id="pagination"] > p').should(
      'contain.text',
      'Showing 981 to 1000 of 1000 workouts',
    );
  });

  it('should navigate to a specific workout', () => {
    cy.get('[data-test-id="workouts-list-element-name"]')
      .first()
      .then((nameElement) => {
        const name = nameElement.text();
        cy.get('[data-test-id="workouts-list-element"]').first().click();
        cy.get('[data-test-id="workout-page-title"]').should(
          'contain.text',
          name,
        );
      });
  });
});
