export default class Movimiento {
  /**
   *
   * @param {String} nombre
   * @param {Array<String>} versiones
   */
  constructor(nombre, versiones = []) {
    this.nombre = nombre;
    this.versiones = versiones;
  }
}
