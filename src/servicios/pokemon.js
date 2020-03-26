const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
export async function cargarPokemon(nombre) {
  return (await fetch(`${BASE_URL}${nombre}`)).json();
}

export async function cargarPokemones(offset = 0, limit = 20) {
  return (await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`)).json();
}
