export const WidgetsPage = {
  elements: {
    btnWidgets: () => cy.contains('.card-body', 'Widgets'),
    btnProgressBar: () => cy.contains('.element-list .menu-list li', 'Progress Bar'),
    btnStartStop: () => cy.get('#startStopButton'),
    btnReset: () => cy.get('#resetButton'),
    progressBar: () => cy.get('#progressBar'),
  },

  navegar() {
    this.elements.btnWidgets().click()
    this.elements.btnProgressBar().click()
  },

  clicarStartStop() {
    this.elements.btnStartStop().click()
  },

  pararAntesde25() {
    cy.wait(1000)
    this.elements.btnStartStop().click()

    this.obterValorBarra().should(((val) => {
      expect(val).to.be.at.most(25);
    }))
  },

  resetProgressBar() {
    this.elements.btnReset()
      .should('be.visible')
    
    this.obterValorBarra().should((val) => {
      expect(val).to.be.equal(100);
    }).then(() => {
      cy.wait(500);
    })

    this.elements.btnReset().click()
  },

  obterValorBarra() {
    return this.elements.progressBar().then($root => {
      const $bar = $root.is('[aria-valuenow]')
        ? $root
        : $root.find('[aria-valuenow], .progress-bar').first();

      const raw = ($bar.attr('aria-valuenow') ?? $bar.text()).replace(/[^\d]/g, '');
      return parseInt(raw, 10);
    });
  },
}
