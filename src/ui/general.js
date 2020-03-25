export function actualizarTextoAyuda(texto) {
  const $ayuda = document.querySelector('#ayuda');
  $ayuda.textContent = texto;
}

export function mostrarTotalPokemones(totalPokemones) {
  document.querySelector('#total-pokemones').textContent = totalPokemones;
}
