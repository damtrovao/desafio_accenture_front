// cypress/pages/InteractionsPage.js
const esc = (t) => String(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const InteractionsPage = {
  sel: {
    tabList: '#demo-tab-list',
    container: '.vertical-list-container',
    items: '.vertical-list-container .list-group-item',
  },

  el: {
    btnInteractions: () => cy.contains('.card-body', 'Interactions'),
    btnSortable:     () => cy.contains('.element-list .menu-list li', 'Sortable'),
    tabList:         () => cy.get('#demo-tab-list'),
    items:           () => cy.get('.vertical-list-container .list-group-item'),
  },

  navegar() {
    cy.viewport(1280, 1000);
    cy.visit('/');
    this.el.btnInteractions().click();
    this.el.btnSortable().click();
    cy.url().should('include', '/sortable');
    this.el.tabList().click();
    this.el.items().should('have.length.greaterThan', 0);

    cy.document().then(doc => {
      const s = doc.createElement('style');
      s.innerHTML = `
        .vertical-list-container .list-group-item, .vertical-list-container * {
          transition: none !important;
          animation: none !important;
        }`;
      doc.head.appendChild(s);
    });
  },

  getOrder() {
    return cy.get(`${this.sel.items}:visible`).then($rows =>
      [...$rows].map(el => el.innerText.trim())
    );
  },

  waitStable() {
    const snap = () =>
      cy.get(`${this.sel.items}:visible`, { timeout: 10000 }).then($els => {
        expect($els.length, 'itens visíveis').to.be.greaterThan(0);
        return [...$els].map(el => el.innerText.trim());
      });

    return snap().then(a =>
      cy.wait(120).then(() =>
        snap().should(b => {
          expect(b.length, 'qtd estável').to.eq(a.length);
          expect(b, 'ordem estável').to.deep.equal(a);
        })
      )
    );
  },

  moveLabelBeforeIndex(label, idx, steps = 12) {
    const rx = new RegExp(`^${esc(label)}$`, 'i');

    cy.get(`${this.sel.items}:visible`).should('have.length.greaterThan', idx);

    cy.contains(`${this.sel.items}:visible`, rx, { scrollBehavior: 'center' })
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .then($src => {
        cy.get(`${this.sel.items}:visible`, { scrollBehavior: 'center' })
          .eq(idx)
          .scrollIntoView({ block: 'center' })
          .should('be.visible')
          .then($dst => {
            cy.wrap($src).drag($dst, { position: 'top', force: true, steps });
            cy.get('body').trigger('mouseup', { force: true });
          });
      });

    this.waitStable();

    this.getOrder().then(current => {
      if (current[idx] !== label) {
        cy.contains(`${this.sel.items}:visible`, rx).then($src => {
          cy.get(`${this.sel.items}:visible`).eq(idx).then($dst => {
            cy.wrap($src).drag($dst, { position: 'top', force: true, steps: steps + 10 });
            cy.get('body').trigger('mouseup', { force: true });
          });
        });
        cy.wait(160);
        this.waitStable();
      }
    });
  },

  ordenarElementos(desired, steps = 12) {
    cy.wrap(Array.from({ length: desired.length })).each((_, i) => {
      this.getOrder().then(current => {
        const want = desired[i];
        if (current[i] === want) return;

        const found = current.findIndex(t => new RegExp(`^${esc(want)}$`, 'i').test(t));
        expect(found, `encontrou "${want}"`).to.be.greaterThan(-1);

        this.moveLabelBeforeIndex(want, i, steps);

        this.getOrder().should(ord => {
          expect(ord[i], `fixou "${want}" em ${i}`).to.eq(want);
        });
      });
    });

    this.getOrder().should(ord => expect(ord).to.deep.equal(desired));
  },
};
