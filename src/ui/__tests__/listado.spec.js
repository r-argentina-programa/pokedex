import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';
import fixture from '../../__tests__/pokedex.fixture.js';
import listadoPokemon from '../../../cypress/fixtures/listado-pagina-1.json';

test('actualiza texto indice', () => {
    document.body.innerHTML = `<div class="list-group" id="indice">`;
    actualizarTextoIndicePokemones('test');
    expect(document.querySelector(('#indice')).textContent)
        .toEqual('test');
});

test('muestra listado pokemon', () => {
    document.body.innerHTML = fixture;
    let nombresPokemones = listadoPokemon.results;
    let pokemonCallBack = jest.fn();
    mostrarListadoPokemones(nombresPokemones, pokemonCallBack);

    let pokemones = document.querySelectorAll('a.list-group-item.list-group-item-action')
    expect(pokemones).toHaveLength(20);

    pokemones[4].click();
    expect(pokemonCallBack).toHaveBeenCalledTimes(1);
});