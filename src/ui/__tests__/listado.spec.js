import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

describe('actualizarTextoIndicePokemones', () => {
  it('debe actualizar el texto del elemento #indice', () => {
    document.body.innerHTML = '<div id="indice"></div>';
    const $indice = document.querySelector('#indice');

    actualizarTextoIndicePokemones('Lista de pokemones');

    expect($indice.textContent).toBe('Lista de pokemones');

    document.body.innerHTML = '';
  });
});

describe('mostrarListadoPokemones', () => {
  let $indice;
  let pokemones;

  beforeEach(() => {
    document.body.innerHTML = '<div id="indice"></div>';
    $indice = document.querySelector('#indice');

    pokemones = [
      { name: 'Pikachu' },
      { name: 'Charizard' },
      { name: 'Squirtle' },
    ];
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('debe mostrar un listado de pokemones', () => {
    mostrarListadoPokemones(pokemones);

    const $links = $indice.querySelectorAll('a');
    expect($links.length).toBe(3);
    expect($links[0].textContent).toBe('Pikachu');
    expect($links[1].textContent).toBe('Charizard');
    expect($links[2].textContent).toBe('Squirtle');
  });

  it('debe llamar al callback al hacer clic en un pokemon', () => {
    const pokemonSeleccionadoCallback = jest.fn();
    mostrarListadoPokemones(pokemones, pokemonSeleccionadoCallback);

    const $links = $indice.querySelectorAll('a');
    $links[0].click();
    expect(pokemonSeleccionadoCallback).toHaveBeenCalledWith('Pikachu');

    $links[1].click();
    expect(pokemonSeleccionadoCallback).toHaveBeenCalledWith('Charizard');

    $links[2].click();
    expect(pokemonSeleccionadoCallback).toHaveBeenCalledWith('Squirtle');
  });
});
