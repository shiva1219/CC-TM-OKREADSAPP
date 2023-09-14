describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });
  
  it('should search a book and Wait for the snack bar to appear', () => {
   
    cy.get('[id="searchInput"]').type('javascript');
    cy.get('[data-test="search"]').click();
    cy.wait(500);
    cy.get('[data-test="add"]').not('[disabled]').first().click();
    cy.wait(500);
    cy.get('[data-test="snackbar" ]').should('be.visible');

  });

});