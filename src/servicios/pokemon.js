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

export const LIMITE_POKEMONES = 20;

export async function cargarPokemon(id) {
  if (id === undefined) {
    throw new Error('Se necesita un identificador para cargar un pokemón');
  }

  try {
    return cargarPokemonDeLocalStorage(id);
  } catch (e) {
    const pokemon = await cargarPokemonDeApi(id);
    guardarPokemon(id, pokemon);
    return pokemon;
  }
}

export async function cargarPokemones(offset = 0, limite = LIMITE_POKEMONES) {
  try {
    return cargarPokemonesDeLocalStorage(offset, limite);
  } catch (e) {
    const pokemones = await cargarPokemonesDeApi(offset, limite);
    guardarPokemones(offset, limite, pokemones);
    return pokemones;
  }
}
