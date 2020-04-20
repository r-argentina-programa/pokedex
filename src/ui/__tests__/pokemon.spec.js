import mostrarPokemon from '../pokemon.js';
import htmlFixture from '../../__tests__/pokedex.fixture.js';
import bulbasaurJSON from '../../../cypress/fixtures/bulbasaur.json';
import HTMLBulbasaur from './bulbasur.fixture.js';

test('La informacion del pokemon se muestra correctamente', () => {
  document.body.innerHTML = htmlFixture;

  mostrarPokemon(bulbasaurJSON);

  expect(document.querySelector('#pokemon-imagen').outerHTML).toMatch(HTMLBulbasaur.imagen);
  expect(document.querySelector('#pokemon-nombre').outerHTML).toMatch(HTMLBulbasaur.nombre);
  expect(document.querySelector('#pokemon-id').outerHTML).toMatch(HTMLBulbasaur.id);
  expect(document.querySelector('#tipos').outerHTML).toMatch(HTMLBulbasaur.tipos);
  expect(document.querySelector('#habilidades').outerHTML).toMatch(HTMLBulbasaur.habilidades);
  expect(document.querySelector('#movimientos').outerHTML).toMatch(HTMLBulbasaur.movimientos);
});
