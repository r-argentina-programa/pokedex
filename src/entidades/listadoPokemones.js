export default class ListadoPokemones {
  /**
   * @param {Number} total
   * @param {String} siguienteUrl
   * @param {String} anteriorUrl
   * @param {Array<String>} nombresPokemones
   */
  constructor(total, siguienteUrl, anteriorUrl, nombresPokemones) {
    this.total = total;
    this.siguienteUrl = siguienteUrl;
    this.anteriorUrl = anteriorUrl;
    this.nombresPokemones = nombresPokemones;
  }
}
