import mostrarPokemon from '../pokemon.js';
import fixture from '../../__tests__/pokedex.fixture.js';
import bulbasaur from '../../__tests__/bulbasaur.json';

test('Prueba mostrar un pokemon', () => {
    document.body.innerHTML = fixture;
    mostrarPokemon(bulbasaur);

    expect(document.querySelector('#pokemon-nombre').textContent)
        .toEqual('bulbasaur');
    expect(document.querySelector('#pokemon-id').textContent)
        .toEqual('1');

    let tipos = document.querySelectorAll('#tipos span');
    expect(tipos[0].textContent)
        .toEqual('grass');
    expect(tipos[1].textContent)
        .toEqual('poison');

    let habilidades = document.querySelectorAll('#habilidades span');
    expect(habilidades[0].textContent)
        .toEqual('overgrow');
    expect(habilidades[1].textContent)
        .toEqual('chlorophyll');
});