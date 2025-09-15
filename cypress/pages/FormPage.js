export const FormPage = {
  elements: {
    btnForm: () => cy.contains('.card-body', 'Forms'),
    btnPracticeForm: () => cy.contains('.element-list .menu-list li', 'Practice Form'),
    inputFirstName: () => cy.get('#firstName'),
    inputLastName: () => cy.get('#lastName'),
    inputEmail: () => cy.get('#userEmail'),
    inputMobile: () => cy.get('#userNumber'),
    inputBirthDate: () => cy.get('#dateOfBirthInput'),
    selectYear: () => cy.get('.react-datepicker__year-select'),
    selectMonth: () => cy.get('.react-datepicker__month-select'),
    inputSubject: () => cy.get('.subjects-auto-complete__value-container'),
    subjectsInput: () => cy.get('#subjectsInput'),
    subjectOptionByText: (text) => cy.contains('.subjects-auto-complete__option', new RegExp(`^${text}$`, 'i')),
    selectedTagByText: (text) => cy.contains('.subjects-auto-complete__multi-value__label', new RegExp(`^${text}$`, 'i')),
    hobbyOption: (hobby) => cy.contains('label', hobby),
    uploadPicture: () => cy.get('#uploadPicture'),
    inputAddress: () => cy.get('#currentAddress'),
    selectState: () => cy.get('#state'),
    selectCity: () => cy.get('#city'),
    submitButton: () => cy.get('#submit'),
    modalPopup: () => cy.get('.modal'),
    closeBtn: () => cy.get('#closeLargeModal'),
  },

  navegar() {
    this.elements.btnForm().click()
    this.elements.btnPracticeForm().click()
  },

  preencherFormulario(dadosForm) {
    this.elements.inputFirstName().type(dadosForm.firstName)
    this.elements.inputLastName().type(dadosForm.lastName)
    this.elements.inputEmail().type(dadosForm.email)
    cy.contains('label', dadosForm.gender).click()
    this.elements.inputMobile().type(dadosForm.mobile)
    this.elements.inputBirthDate().click()
    this.elements.selectYear().select(dadosForm.yearOfBirth.toString())
    this.elements.selectMonth().select(dadosForm.monthOfBirth)

    const day = String(dadosForm.dateOfBirth).padStart(2, '0')
    cy.get(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`).click()
    
    this.selecionarSubjects(dadosForm.subjects)
    this.selecionarHobbies(dadosForm.hobbies)
    this.elements.uploadPicture().selectFile('cypress/fixtures/picture.txt')
    this.elements.inputAddress().type(dadosForm.address)

    this.elements.selectState().click()
    cy.get('#react-select-3-input').type(`${dadosForm.state}{enter}`)

    this.elements.selectCity().click()
    cy.get('#react-select-4-input').type(`${dadosForm.city}{enter}`)
  },

  selecionarSubject(text) {
    this.elements.inputSubject().click()
    this.elements.subjectsInput().type(text);
    this.elements.subjectOptionByText(text).click();
    this.elements.selectedTagByText(text).should('be.visible');
  },

  selecionarSubjects(subjects) {
    cy.wrap(subjects).each((s) => {
        this.selecionarSubject(s);
    })
  },

  selecionarHobbies(hobbies) {
    hobbies.forEach((hobby) => {
        this.elements.hobbyOption(hobby).click()
    })
  },

  enviar() {
    this.elements.submitButton().click()
  },

  fecharPopup() {
    this.elements.closeBtn().click({force:true})
  }
}
