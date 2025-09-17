/// <reference types="cypress"/>

import { WidgetsPage } from '../../pages/WidgetsPage'

let registers;

describe('Web Tables', () => {
    before(() => {
        registers = Cypress.env('registers');
    })

    beforeEach(() => {
        cy.visit('/')
    })

    /*it('Teste 04 - Validar Criar Registro - Web Tables', () => {
        WidgetsPage.navegar()
        WidgetsPage.clicarBtnAdd()
        WidgetsPage.preencherFormulario(registers[0])
        WidgetsPage.validarRegistroExistente(registers[0])
    })

    it('Teste 05 - Validar Editar Registro - Web Tables', () => {
        WidgetsPage.navegar()
        WidgetsPage.clicarBtnAdd()
        WidgetsPage.preencherFormulario(registers[1])
        WidgetsPage.validarRegistroExistente(registers[1])
        WidgetsPage.editarRegistro(registers[1], registers[2])
        WidgetsPage.validarRegistroExistente(registers[2])
    })

    it('Teste 06 - Validar Deletar Registro - Web Tables', () => {
        WidgetsPage.navegar()
        WidgetsPage.clicarBtnAdd()
        WidgetsPage.preencherFormulario(registers[0])
        WidgetsPage.validarRegistroExistente(registers[0])
        WidgetsPage.excluirRegistro(registers[0])
        WidgetsPage.validarRegistroInexistente(registers[0])
    })*/

    it('Teste 07 - Validar Criar Vários Registros - Web Tables', () => {
        WidgetsPage.navegar()
        registers.forEach(register => {
            WidgetsPage.clicarBtnAdd()
            WidgetsPage.preencherFormulario(register)
            WidgetsPage.validarRegistroExistente(register)
        })
        registers.forEach(register => {
            WidgetsPage.excluirRegistro(register)
            WidgetsPage.validarRegistroInexistente(register)
        })
    })
})