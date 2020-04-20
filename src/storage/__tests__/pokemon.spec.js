import { guardarPokemon, guardarPokemones, cargarPokemon, cargarPokemones } from '../pokemon.js';
import bulbasurJSON from '../../../cypress/fixtures/bulbasaur.json';
import listadoPagina1 from '../../../cypress/fixtures/listado-pagina-1.json';

test('Obtener datos de un pokemon desde localStorage', () => {
  const bulbasaurID = 1;

  guardarPokemon(bulbasaurID, bulbasurJSON);
  expect(cargarPokemon(bulbasaurID)).toEqual(bulbasurJSON);
});

it('Recibiendo errores correctamente al intentar cargar/guardar pokemones de forma incorrecta en localStorage', () => {
  expect(() => {
    guardarPokemon(1);
  }).toThrow('Se necesita un identificador y un pokemon para guardar en localStorage');

  expect(() => {
    cargarPokemon();
  }).toThrow('Se necesita un identificador para cargar un pokemón');

  expect(() => {
    cargarPokemon(5000);
  }).toThrow('Pokemon con id 5000 no encontrado');
});

test('Cargar lista de pokemones desde localStorage', () => {
  guardarPokemones(0, 20, listadoPagina1.results);
  expect(cargarPokemones(0, 20)).toEqual(listadoPagina1.results);
});

test('Recibiendo errores correctamente al guardar/cargar lista de pokemones de forma incorrecta desde localStorage', () => {
  expect(() => {
    cargarPokemones(5000);
  }).toThrow('Listado de pokemones con offset 5000 y limite 20 no encontrado');

  expect(() => {
    guardarPokemones(0, 20);
  }).toThrow('Se necesita offset, limite y pokemones');
});
