export function actualizarTextoIndicePokemones(texto) {
  const $indice = document.querySelector('#indice');
  $indice.textContent = texto;
}

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
