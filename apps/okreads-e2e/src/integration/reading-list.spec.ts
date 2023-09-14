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

  it('Marked as finished', () => {
    cy.get('[id="searchInput"]').type('javascript');
    cy.get('[data-test="search"]').click();
    cy.wait(500);
    cy.get('[data-test="add"]').not('[disabled]').first().click();
    cy.wait(500);
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-test="Finished"]').first().click();
    cy.get('[data-test="remove_circle"]').first().click();
    cy.get('tmo-reading-list').find('.reading-list-item').should('have.length', 0);
  });
});