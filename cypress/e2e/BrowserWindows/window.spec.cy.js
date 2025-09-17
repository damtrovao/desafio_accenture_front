/// <reference types="cypress"/>

import { WindowPage } from '../../pages/WindowPage'

// O Cypress, propositalmente, não lida com múltiplas janelas ou abas. Para contornar essa limitação, quebrei o teste em duas etapas:
// 1. Validar que o botão abre uma nova janela (sem realmente abrir a nova janela).
// 2. Validar o conteúdo da nova janela, forçando o link a abrir na mesma aba, para que o Cypress consiga "visualizar" o conteúdo da nova página aberta.

describe('New Window', () => {
    before(() => {
    })

    beforeEach(() => {
        cy.visit('/')
    })

    it('Teste 02 - Validar Abrir nova Janela', () => {
        WindowPage.navegar()
        WindowPage.clicarNewWindowValidarAbertura()
    })

    it('Teste 03 - Validar conteúdo da nova Janela', () => {
        WindowPage.navegar()
        WindowPage.clicarNewWindowValidarConteúdo()
        WindowPage.fecharNewWindow()
    })
})