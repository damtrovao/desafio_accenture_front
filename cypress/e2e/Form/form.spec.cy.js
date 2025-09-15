/// <reference types="cypress"/>

describe('Form', () => {
    beforeEach(() => {
        console.log("Teste ", process.env.BASE_URL)
        cy.visit('/')
    })
    it('Teste 01 - Validar acessar página de Form', () => {
        cy.navegarPaginaForms()
    })
})