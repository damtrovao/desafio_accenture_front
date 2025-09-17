/// <reference types="cypress"/>

import { WebTablesPage } from '../../pages/WebTablesPage'

let registers;

describe('Web Tables', () => {
    before(() => {
        registers = Cypress.env('registers');
    })

    beforeEach(() => {
        cy.visit('/')
    })

    /*it('Teste 04 - Validar Criar Registro - Web Tables', () => {
        WebTablesPage.navegar()
        WebTablesPage.clicarBtnAdd()
        WebTablesPage.preencherFormulario(registers[0])
        WebTablesPage.validarRegistroExistente(registers[0])
    })

    it('Teste 05 - Validar Editar Registro - Web Tables', () => {
        WebTablesPage.navegar()
        WebTablesPage.clicarBtnAdd()
        WebTablesPage.preencherFormulario(registers[1])
        WebTablesPage.validarRegistroExistente(registers[1])
        WebTablesPage.editarRegistro(registers[1], registers[2])
        WebTablesPage.validarRegistroExistente(registers[2])
    })

    it('Teste 06 - Validar Deletar Registro - Web Tables', () => {
        WebTablesPage.navegar()
        WebTablesPage.clicarBtnAdd()
        WebTablesPage.preencherFormulario(registers[0])
        WebTablesPage.validarRegistroExistente(registers[0])
        WebTablesPage.excluirRegistro(registers[0])
        WebTablesPage.validarRegistroInexistente(registers[0])
    })*/

    it('Teste 07 - Validar Criar Vários Registros - Web Tables', () => {
        WebTablesPage.navegar()
        registers.forEach(register => {
            WebTablesPage.clicarBtnAdd()
            WebTablesPage.preencherFormulario(register)
            WebTablesPage.validarRegistroExistente(register)
        })
        registers.forEach(register => {
            WebTablesPage.excluirRegistro(register)
            WebTablesPage.validarRegistroInexistente(register)
        })
    })
})