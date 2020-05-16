/**
 * @typedef {import('./movimiento').default} Movimiento
 */

export default class Pokemon {
  /**
   * @param {Number} id
   * @param {String} nombre
   * @param {String} foto
   * @param {Array<String>} habilidades
   * @param {Array<String>} tipos
   * @param {Array<Movimiento>} movimientos
   */
  constructor(id, nombre, foto, habilidades = [], tipos = [], movimientos = []) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.habilidades = habilidades;
    this.tipos = tipos;
    this.movimientos = movimientos;
  }
}
