describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
  it('should search a book and Wait for the snack bar to appear', () => {
   
    cy.get('[id="searchInput"]').type('javascript');
    cy.get('[data-test="search"]').click();
    cy.wait(500);
    cy.get('[data-test="add"]').not('[disabled]').first().click();
    cy.wait(500);
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-test="remove"]').first().click();
    cy.wait(500);
    cy.get('[data-test="snackbar" ]').should('be.visible');
  });
});