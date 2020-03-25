const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
export function cargarPokemon(nombre) {
  return fetch(`${BASE_URL}${nombre}`).then((r) => r.json());
}

export function cargarPokemones(offset = 0, limit = 20) {
  return fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`).then((r) => r.json());
}
