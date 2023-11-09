/* eslint-disable linebreak-style */

import mostrarPokemon from '../pokemon.js';
import { mapearPokemon } from '../../mapeadores/pokemon.js';
import pokedexFixture from '../../__tests__/pokedex.fixture.js';
import bulbasaur from '../../../cypress/fixtures/bulbasaur.json';


const mapearBalbasaur = mapearPokemon(bulbasaur);
document.body.innerHTML = pokedexFixture;
mostrarPokemon(mapearBalbasaur);

test('Chequear nombre e Id', () => {
  const nombrePokemon = document.querySelector('#pokemon-nombre').textContent;
  const IdPokemon = document.querySelector('#pokemon-id').textContent;
  expect(nombrePokemon).toBe('bulbasaur');
  expect(IdPokemon).toBe('1');
});

test('Chequear imagen y texto alternativo', () => {
  const imagenPokemon = document.querySelector('#pokemon-imagen');
  expect(imagenPokemon.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  expect(imagenPokemon.alt).toBe('Imagen frontal del pokemon bulbasaur');
});

test('Chequear tipos', () => {
  const cantidadTipos = document.querySelectorAll('#tipos span');
  const tipoUno = document.querySelectorAll('#tipos span')[0];
  const tipoDos = document.querySelectorAll('#tipos span')[1];
  expect(cantidadTipos.length).toBeGreaterThan(0);
  expect(tipoUno.textContent).toBe('poison');
  expect(tipoDos.textContent).toBe('grass');
});

test('Chequear habilidades', () => {
  const habilidadesPokemon = document.querySelectorAll('#habilidades span');
  expect(habilidadesPokemon.length).toBeGreaterThan(0);
});

test('Chequear movimientos', () => {
  const movimientosPokemon = document.querySelectorAll('#movimientos tr');
  expect(movimientosPokemon.length).toBeGreaterThan(5);
});
