/* eslint-disable linebreak-style */
import { mostrarListadoPokemones } from '../listado.js';

test('Chequear listado Pokemons. Default callback', () => {
  const PokemonsName = ['pikachu'];
  const mockData = jest.fn();
  document.body.innerHTML = '<div id="indice"></div>';

  mostrarListadoPokemones(PokemonsName, mockData);
  expect(document.querySelectorAll('#indice a')).toHaveLength(1);

  const contenedorIndice = document.querySelectorAll('#indice a')[0];
  contenedorIndice.click();
  expect(mockData).toHaveBeenCalledTimes(1);
});
