/// <reference types="cypress"/>

import { FormPage } from '../../pages/FormPage'

let forms;

describe('Form', () => {
    before(() => {
        forms = Cypress.env('forms');
    })

    beforeEach(() => {
        cy.visit('/')
    })
    
    it('Teste 01 - Validar preencher e enviar Form', () => {
        FormPage.navegar()
        FormPage.preencherFormulario(forms[0])
        FormPage.enviar()

        FormPage.elements.modalPopup().should('be.visible')
        FormPage.fecharPopup()
    })
})