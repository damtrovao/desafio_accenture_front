Cypress.Commands.add('navegarPaginaForms', () => {
    cy.get(btnForm)
        .should('be.visible')
        .click()
})