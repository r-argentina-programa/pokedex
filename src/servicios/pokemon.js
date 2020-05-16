/**
 * @typedef {import('../entidades/pokemon').default} Pokemon
 * @typedef {import('../entidades/listadoPokemones').default} ListadoPokemones
 */

import {
  cargarPokemon as cargarPokemonDeApi,
  cargarPokemones as cargarPokemonesDeApi,
} from '../api/pokemon.js';

import {
  cargarPokemon as cargarPokemonDeLocalStorage,
  cargarPokemones as cargarPokemonesDeLocalStorage,
  guardarPokemon,
  guardarPokemones,
} from '../storage/pokemon.js';
import { mapearListadoPokemones, mapearPokemon } from '../mapeadores/pokemon.js';

export const LIMITE_POKEMONES = 20;

/**
 * @param {String} id
 * @returns {Pokemon}
 */
export async function cargarPokemon(id) {
  if (id === undefined) {
    throw new Error('Se necesita un identificador para cargar un pokemón');
  }

  let pokemon;

  try {
    pokemon = cargarPokemonDeLocalStorage(id);
  } catch (e) {
    const pokemonData = await cargarPokemonDeApi(id);
    pokemon = mapearPokemon(pokemonData);
    guardarPokemon(id, pokemon);
  }

  return pokemon;
}

/**
 * @param {String} offset
 * @param {String} limite
 * @return {ListadoPokemones}
 */
export async function cargarPokemones(offset = 0, limite = LIMITE_POKEMONES) {
  try {
    return cargarPokemonesDeLocalStorage(offset, limite);
  } catch (e) {
    const pokemonesData = await cargarPokemonesDeApi(offset, limite);
    const pokemones = mapearListadoPokemones(pokemonesData);
    guardarPokemones(offset, limite, pokemones);
    return pokemones;
  }
}
