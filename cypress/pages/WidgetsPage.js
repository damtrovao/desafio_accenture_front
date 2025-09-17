export const WidgetsPage = {
  elements: {
    btnWindow: () => cy.contains('.card-body', 'Alerts, Frame & Windows'),
    btnBrowserWindows: () => cy.contains('.element-list .menu-list li', 'Browser Windows'),
    btnNewWindow: () => cy.get('#windowButton'),
    textNewWindow: () => cy.get('#sampleHeading'),
  },

  navegar() {
    this.elements.btnWindow().click()
    this.elements.btnBrowserWindows().click()
  },

  clicarNewWindowValidarAbertura() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')
    })

    this.elements.btnNewWindow().click()

    cy.get('@windowOpen').should('be.called')
  },

  clicarNewWindowValidarConteúdo() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as("newWindow");
    })

    this.elements.btnNewWindow().click();

    cy.get('@newWindow').should('have.been.called');
    cy.get('@newWindow').then((stub) => {
      const firstCall = stub.getCall(0);
      const urlArg = firstCall && firstCall.args && firstCall.args[0];

      const targetUrl = (urlArg && urlArg !=='about:blank') ? urlArg : 'https://demoqa.com/sample';

      if (targetUrl) {
        cy.visit(targetUrl);
      }
    });

    this.elements.textNewWindow().should('have.text', 'This is a sample page')
  },

  fecharNewWindow() {
    cy.go('back')
    cy.url().should('include', 'browser-windows')
  },
}
