import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';
import primeraPagina from '../../../cypress/fixtures/listado-pagina-1.json';

describe('La lista de pokemones funciona correctamente', () => {
  document.body.innerHTML = '<div class="list-group" id="indice"></div>';
  const pokemones = primeraPagina.results;
  const pokemonMockFunction = jest.fn();
  mostrarListadoPokemones(pokemones, pokemonMockFunction);
  const $listadoPokemones = document.querySelectorAll('#indice > a');

  test('Los nombres de los pokemones se muestran de forma correcta', () => {
    $listadoPokemones.forEach(($pokemon, index) => {
      expect($pokemon.textContent).toMatch(primeraPagina.results[index].name);
    });
  });

  test('Cuando se clickea algun pokemon se llama a la funcion pasada con el paramentro correcto', () => {
    $listadoPokemones.forEach(($pokemon) => {
      $pokemon.click();
      expect(pokemonMockFunction).toBeCalledWith($pokemon.textContent);
    });
  });
});

test('El texto del indice se acutaliza correctamente', () => {
  document.body.innerHTML = '<div class="list-group" id="indice"></div>';

  actualizarTextoIndicePokemones('Cargando...');
  expect(document.querySelector('#indice').textContent).toMatch('Cargando...');

  actualizarTextoIndicePokemones('');
  expect(document.querySelector('#indice').textContent).toMatch('');
});
