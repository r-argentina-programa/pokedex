import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';
import pokedexFixture from '../../__tests__/pokedex.fixture.js';

describe('Testea el listado de pokemones', () => {
  test('Actualiza el texto del listado', () => {
    document.body.innerHTML = pokedexFixture;
    actualizarTextoIndicePokemones('test');
    expect(document.querySelector(('#indice')).textContent).toContain('test');
  });

  test('Muestra la lista de pokemones ', () => {
    document.body.innerHTML = pokedexFixture;
    mostrarListadoPokemones(['bulbasur']);
    expect(document.querySelectorAll('.list-group-item')).toHaveLength(1);
  });

  test('Configura funcion de callback', () => {
    const mockCallback = jest.fn();
    document.body.innerHTML = pokedexFixture;
    mostrarListadoPokemones(['bulbasur'], mockCallback);
    document.querySelector('.list-group-item').click();
    expect(mockCallback).toHaveBeenCalled();
  });
});
