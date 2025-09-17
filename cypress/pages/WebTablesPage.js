export const WebTablesPage = {
  elements: {
    btnElements: () => cy.contains('.card-body', 'Elements'),
    btnWebTables: () => cy.contains('.element-list .menu-list li', 'Web Tables'),
    btnAdd: () => cy.get('#addNewRecordButton'),
    inputFirstName: () => cy.get('#firstName'),
    inputLastName: () => cy.get('#lastName'),
    inputEmail: () => cy.get('#userEmail'),
    inputAge: () => cy.get('#age'),
    inputSalary: () => cy.get('#salary'),
    inputDepartment: () => cy.get('#department'),
    btnSubmit: () => cy.get('#submit'),
    selectNumeroRegistros: () => cy.get('select[aria-label="rows per page"]'),
  },

  navegar() {
    this.elements.btnElements().click()
    this.elements.btnWebTables().click()
  },

  clicarBtnAdd() {
    this.elements.btnAdd().click()
  },

  preencherFormulario(register) {
    this.elements.inputFirstName().type(register.firstName)
    this.elements.inputLastName().type(register.lastName)
    this.elements.inputEmail().type(register.email)
    this.elements.inputAge().type(register.age)
    this.elements.inputSalary().type(register.salary)
    this.elements.inputDepartment().type(register.department)
    this.elements.btnSubmit().click()
  },

  validarRegistroExistente(register) {
    this.elements.selectNumeroRegistros().select('20')
    cy.contains('.rt-tbody', register.firstName)
      .should('be.visible')
      .and('contain', register.lastName)
      .and('contain', register.email)
      .and('contain', register.age)
      .and('contain', register.salary)
      .and('contain', register.department)
  },

  editarRegistro(oldRegister, newRegister) {
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', oldRegister.firstName)
      .and('contain', oldRegister.lastName)
      .within(() => {
        cy.get('[title="Edit"]').click()
      })

    this.elements.inputFirstName().clear().type(newRegister.firstName)
    this.elements.inputLastName().clear().type(newRegister.lastName)
    this.elements.inputEmail().clear().type(newRegister.email)
    this.elements.inputAge().clear().type(newRegister.age)
    this.elements.inputSalary().clear().type(newRegister.salary)
    this.elements.inputDepartment().clear().type(newRegister.department)
    this.elements.btnSubmit().click()
  },

  excluirRegistro(register) {
    this.elements.selectNumeroRegistros().select('20')

    cy.get('.rt-tbody')
      .contains('.rt-tr-group', register.firstName)
      .and('contain', register.lastName)
      .within(() => {
        cy.get('[title="Delete"]').click()
    })
  },

  validarRegistroInexistente(register) {
    cy.contains('.rt-tbody', register.email)
      .should('not.exist')
  }
}
