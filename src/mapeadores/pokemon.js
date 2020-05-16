import Pokemon from '../entidades/pokemon.js';
import Movimiento from '../entidades/movimiento.js';

/**
 * @param {Object} datosApi
 * @returns {Pokemon}
 */
export default function mapearPokemon(datosApi) {
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
