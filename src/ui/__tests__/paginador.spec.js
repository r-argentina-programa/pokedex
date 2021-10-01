import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';
import pokedexFixture from '../../__tests__/pokedex.fixture.js';

describe('Testea paginador de la pokedex', () => {
  const mockCallback = jest.fn();
  test('Testea que cambiar la página funcione', () => {
    document.body.innerHTML = '<li class="page-item active"><a class="page-link" href="#" data-pagina="1">1</a></li>';
    const anchor = document.querySelector('.page-link');
    const elemento = { target: anchor, preventDefault: () => {} };
    manejarCambioPagina(elemento, mockCallback);
    expect(mockCallback).toHaveBeenCalled();
  });

  test('Testea que el botón "anterior" esté deshabilitado', () => {
    document.body.innerHTML = pokedexFixture;
    mostrarPaginador(
      1118,
      1,
      'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
      null,
    );
    expect(
      document.querySelector('.page-item').classList.contains('disabled'),
    ).toBe(true);
  });

  test('Testea que el botón "siguiente" esté deshabilitado', () => {
    document.body.innerHTML = pokedexFixture;
    mostrarPaginador(
      1118,
      1,
      null,
      'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
    );
    expect(
      document.querySelector('[data-pagina=Siguiente]').closest('.page-item')
        .classList.contains('disabled'),
    ).toBe(true);
  });

  test('Testea que la pokedex cambie de página', () => {
    document.body.innerHTML = pokedexFixture;
    mostrarPaginador(
      1118,
      1,
      null,
      mockCallback,
    );
    document.querySelector('#paginador').click();
    expect(mockCallback).toHaveBeenCalled();
  });
});
