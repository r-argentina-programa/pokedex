// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('Pokedex', () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });

    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', 'fixture:listado-pagina-1')
      .as('obtenerPrimeraPagina');

    cy.visit('http://127.0.0.1:8080', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });

  it('Carga la primera página', () => {
    const TOTAL_POKEMONES = 964;
    const CANTIDAD_PAGINAS = 49;
    const POKEMON_POR_PAGINA = 20;

    cy.get('#total-pokemones')
      .should('have.text', TOTAL_POKEMONES.toString());
    cy.get('.page-item:nth(0)')
      .should('have.class', 'disabled');
    cy.get('.page-item:last')
      .should('not.have.class', 'disabled');
    cy.get('.page-link')
      .should('have.length', CANTIDAD_PAGINAS + 2); // incluye links "siguiente" y "anterior"

    cy.get('#indice .list-group-item')
      .should('have.length', POKEMON_POR_PAGINA);
  });

  it('Usa el paginador', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', 'fixture:listado-pagina-1')
      .as('obtenerPrimeraPagina');
    cy.route('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20', 'fixture:listado-pagina-2')
      .as('obtenerSegundaPagina');
    cy.route('https://pokeapi.co/api/v2/pokemon/?offset=960&limit=20', 'fixture:listado-pagina-49')
      .as('obtenerUltimaPagina');

    cy.get('#paginador .page-link:first')
      .as('paginaAnterior')
      .parent()
      .should('have.class', 'disabled');

    cy.get('#paginador .page-link:last')
      .as('paginaSiguiente')
      .click();

    cy.get('@paginaSiguiente')
      .parent()
      .should('not.have.class', 'disabled');

    cy.get('@paginaAnterior')
      .parent()
      .should('not.have.class', 'disabled');

    cy.get('@paginaAnterior')
      .click();

    cy.get('@paginaAnterior')
      .parent()
      .should('have.class', 'disabled');

    cy.get('#paginador .page-link')
      .eq(-2)
      .as('ultimaPagina')
      .click();

    cy.get('@paginaSiguiente')
      .parent()
      .should('have.class', 'disabled');

    cy.get('#paginador .page-link')
      .eq(1)
      .as('primeraPagina')
      .click();
  });

  it('Carga un pokemon cuando se lo selecciona del índice', () => {
    const CANTIDAD_MOVIMIENTOS = 78;
    const CANTIDAD_TIPOS = 2;
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/bulbasaur', 'fixture:bulbasaur')
      .as('obtenerBulbasaur');

    cy.get('#ayuda')
      .as('ayuda')
      .should('have.text', 'Seleccioná un pokemon para ver su información');

    cy.get('#pokemon-contenedor')
      .as('contenedor')
      .should('not.be.visible');

    cy.get('#indice .list-group-item:first')
      .click();

    cy.get('@ayuda')
      .should('have.text', '');

    cy.get('#pokemon-contenedor')
      .as('contenedor')
      .should('be.visible');

    cy.get('#tipos-contenedor .type')
      .should('have.length', CANTIDAD_TIPOS);

    cy.get('#movimientos tr')
      .should('have.length', CANTIDAD_MOVIMIENTOS);
  });
});
