/**
 * @typedef {import('../entidades/pokemon').default} Pokemon
 */

export function actualizarTextoIndicePokemones(texto) {
  const $indice = document.querySelector('#indice');
  $indice.textContent = texto;
}

/**
 * @callback pokemonSeleccionadoCallback
 * @param {string} nombre
 */

/**
 * @param {Array<Pokemon>} pokemones
 * @param {pokemonSeleccionadoCallback} pokemonSeleccionadoCallback
 */
export function mostrarListadoPokemones(pokemones, pokemonSeleccionadoCallback = () => {}) {
  const $indice = document.querySelector('#indice');
  $indice.innerHTML = '';

  pokemones.forEach((pokemon) => {
    const { name: nombre } = pokemon;
    const $link = document.createElement('a');
    $link.className = 'list-group-item list-group-item-action';
    $link.setAttribute('href', '#');
    $link.textContent = nombre;
    $link.onclick = () => pokemonSeleccionadoCallback(nombre);
    $indice.appendChild($link);
  });
}
