import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

describe('actualizarTextoIndicePokemones()', () => {
  it('Deberia actualizar elemento con id "indice"', () => {
    const $indice = document.createElement('div');
    $indice.setAttribute('id', 'indice');
    document.body.appendChild($indice);

    actualizarTextoIndicePokemones('Nuevo texto en el indice');
    expect($indice.textContent).toEqual('Nuevo texto en el indice');
    document.body.removeChild($indice);
  });
});

describe('mostrarListadoPokemones', () => {
  it('debería crear un elemento para cada nombre de pokemon y agregarlos al elemento con id "indice"', () => {
    const $indice = document.createElement('div');
    $indice.setAttribute('id', 'indice');
    document.body.appendChild($indice);

    const nombresPokemones = ['Bulbasaur', 'Charmander', 'Squirtle'];
    const pokemonSeleccionadoCallback = jest.fn();

    mostrarListadoPokemones(nombresPokemones, pokemonSeleccionadoCallback);

    const $links = document.querySelectorAll('.list-group-item');
    expect($links.length).toEqual(nombresPokemones.length);

    $links.forEach(($link, index) => {
      expect($link.textContent).toEqual(nombresPokemones[index]);
      expect($link.getAttribute('href')).toEqual('#');
    });

    expect($indice.contains($links[0])).toBe(true);
    expect($indice.contains($links[1])).toBe(true);
    expect($indice.contains($links[2])).toBe(true);

    $links[0].click();
    expect(pokemonSeleccionadoCallback).toHaveBeenCalledWith('Bulbasaur');

    document.body.removeChild($indice);
  });
});
