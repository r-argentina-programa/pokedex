/// <reference types="Jest" />
import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from "../listado.js";
import { listadoPokemones } from './listado.fixture.js';
import fixture from '../../__tests__/pokedex.fixture.js';

test('Actualiza el texto del índice', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  actualizarTextoIndicePokemones('test');
  expect(document.querySelector('#indice').textContent)
    .toContain('test');
});

test('Muestra el listado de pokemones', () => {
  document.body.innerHTML = fixture;
  mostrarListadoPokemones(listadoPokemones);
  expect(document.querySelectorAll('#indice .list-group-item.list-group-item-action'))
    .toHaveLength(20);
  expect(document.querySelector('#indice > a').textContent)
    .toContain('bulbasaur');
});

test('Ejecuta la función de callback cuando se hace click sobre un item', () => {
  document.body.innerHTML = fixture;
  const mockCallBack = jest.fn();
  mostrarListadoPokemones(listadoPokemones, mockCallBack());
  document.querySelector('#indice > a').click();
  expect(mockCallBack.mock.calls.length).toEqual(1);
});


