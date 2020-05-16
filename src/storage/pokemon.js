/**
 * @typedef {import('../entidades/pokemon').default} Pokemon
 * @typedef {import('../entidades/listadoPokemones').default} ListadoPokemones
 */

export const LIMITE_POKEMONES = 20;

function obtenerKeyPokemon(id) {
  return `pokemon_${id}`;
}

function obtenerKeyPokemones(offset, limite) {
  return `pokemones_${offset}_${limite}`;
}

/**
 * @param {String} id
 * @returns {Pokemon}
 */
export function cargarPokemon(id) {
  if (id === undefined) {
    throw new Error('Se necesita un identificador para cargar un pokemón');
  }

  const pokemon = JSON.parse(localStorage.getItem(obtenerKeyPokemon(id)));
  if (pokemon === null) {
    throw new Error(`Pokemon con id ${id} no encontrado`);
  }

  return pokemon;
}

/**
 * @param {Number} offset
 * @param {Number} limite
 * @return {ListadoPokemones}
 */
export function cargarPokemones(offset = 0, limite = LIMITE_POKEMONES) {
  const pokemones = JSON.parse(localStorage.getItem(obtenerKeyPokemones(offset, limite)));
  if (pokemones === null) {
    throw new Error(`Listado de pokemones con offset ${offset} y limite ${limite} no encontrado`);
  }

  return pokemones;
}

/**
 * @param {String} id
 * @param {Pokemon} pokemon
 */
export function guardarPokemon(id, pokemon) {
  if (id === undefined || typeof pokemon !== 'object') {
    throw new Error('Se necesita un identificador y un pokemon para guardar en localStorage');
  }

  localStorage.setItem(obtenerKeyPokemon(id), JSON.stringify(pokemon));
}

/**
 * @param {Number} offset
 * @param {Number} limite
 * @param {ListadoPokemones} pokemones
 */
export function guardarPokemones(offset, limite, pokemones) {
  if (offset === undefined || limite === undefined || typeof pokemones !== 'object') {
    throw new Error('Se necesita offset, limite y pokemones');
  }

  localStorage.setItem(obtenerKeyPokemones(offset, limite), JSON.stringify(pokemones));
}
