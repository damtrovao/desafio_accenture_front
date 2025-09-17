/// <reference types="cypress"/>

import { InteractionsPage } from '../../pages/InteractionsPage'

describe('Interactions', () => {
    const ordem = ['Six', 'Five', 'Four', 'Three', 'Two', 'One'];

    beforeEach(() => {
        cy.viewport(1280, 1000); 
        cy.visit('/')
    })

    it('Teste 09 - Validar Arrastar itens para ordem Decrescente - Interactions', () => {
        InteractionsPage.navegar()
        InteractionsPage.ordenarElementos(ordem)
    })

})