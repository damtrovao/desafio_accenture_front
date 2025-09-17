// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import './commands/dataFaker.commands'

Cypress.Commands.add('html5Drag', (source, target, opts = {}) => {
  const containerSelector = opts.container || null;

  cy.wrap(source).should('exist').and('be.visible');
  cy.wrap(target).should('exist').and('be.visible');

  cy.wrap(source).then(($src) => {
    cy.wrap(target).then(($tgt) => {
      const srcEl = $src[0];
      const tgtEl = $tgt[0];

      const dropEl = containerSelector
        ? $tgt.closest(containerSelector)[0] || tgtEl
        : tgtEl;

      const dt = new DataTransfer();

      const center = (el) => {
        const r = el.getBoundingClientRect();
        return { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
      };

      const s = center(srcEl);
      const d = center(tgtEl);

      cy.wrap($src).scrollIntoView({ block: 'center' });
      cy.wrap($tgt).scrollIntoView({ block: 'center' });

      cy.wrap($src)
        .trigger('pointerdown', { ...s, button: 0, buttons: 1, force: true })
        .trigger('mousedown',    { ...s, button: 0, which: 1, force: true })
        .trigger('dragstart',    { ...s, dataTransfer: dt, force: true });

      cy.document().trigger('mousemove', { ...s, force: true });
      cy.document().trigger('mousemove', { ...d, force: true });

      cy.wrap(dropEl)
        .trigger('dragenter', { ...d, dataTransfer: dt, force: true })
        .trigger('dragover',  { ...d, dataTransfer: dt, force: true })
        .trigger('drop',      { ...d, dataTransfer: dt, force: true });

      cy.wrap($src)
        .trigger('dragend',   { ...d, dataTransfer: dt, force: true })
        .trigger('mouseup',   { ...d, button: 0, force: true });

      cy.wait(80);
    });
  });
});