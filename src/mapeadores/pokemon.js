import Pokemon from '../entidades/pokemon';
import Movimiento from '../entidades/movimiento';
import ListadoPokemones from '../entidades/listadoPokemones';

/**
 * @param {Object} datosApi
 * @returns {Pokemon}
 */
export function mapearPokemon(datosApi) {
  const {
    id,
    name: nombre,
    sprites: { front_default: fotoPrincipal },
    types: tipos,
    abilities: habilidades,
    moves: movimientos,
  } = datosApi;

  return new Pokemon(
    id,
    nombre,
    fotoPrincipal,
    habilidades.map((item) => item.ability.name),
    tipos.map((item) => item.type.name),
    movimientos.map((item) => new Movimiento(
      item.move.name,
      item.version_group_details.map((v) => v.version_group.name),
    )),
  );
}

/**
 * @param {Object} datosApi
 * @returns {ListadoPokemones}
 */
export function mapearListadoPokemones(datosApi) {
  const {
    count: total,
    next: siguienteUrl,
    previous: anteriorUrl,
    results: resultados,
  } = datosApi;

  return new ListadoPokemones(
    total,
    siguienteUrl,
    anteriorUrl,
    resultados.map((pokemon) => pokemon.name),
  );
}
