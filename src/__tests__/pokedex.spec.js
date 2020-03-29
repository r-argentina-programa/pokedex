import inicializar from '../pokedex.js';
import fixture from './pokedex.fixture.js';
import listadoFixture from '../../cypress/fixtures/listado-pagina-1.json';


test('inicializa pokedex', () => {
  document.body.innerHTML = fixture;
  global.fetch = jest.fn()
    .mockImplementation(() => new Promise((resolve) => {
      const jsonPromise = new Promise((r) => {
        r(listadoFixture);
      });
      resolve({ json: () => jsonPromise });
    }));

  inicializar()
    .then(() => {
      expect(document.querySelector('#ayuda').textContent)
        .toContain('Seleccioná un pokemon para ver su información');

      expect(document.querySelector('#total-pokemones').textContent)
        .toContain('964');

      expect(document.querySelectorAll('#indice .list-group-item'))
        .toHaveLength(20);
    });
});
