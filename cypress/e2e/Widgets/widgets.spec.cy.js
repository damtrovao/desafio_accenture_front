/// <reference types="cypress"/>

import { WidgetsPage } from '../../pages/WidgetsPage'

let registers;

describe('Widgets', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Teste 08 - Validar Progress Bar - Widgets', () => {
        WidgetsPage.navegar()
        WidgetsPage.clicarStartStop()
        WidgetsPage.pararAntesde25()
        WidgetsPage.clicarStartStop()
        WidgetsPage.resetProgressBar()
    })

})