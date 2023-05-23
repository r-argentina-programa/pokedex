import {
  actualizarTextoIndicePokemones,
  mostrarListadoPokemones,
} from '../listado.js';

test('actualiza el texto indice de pokemones', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  actualizarTextoIndicePokemones('testeando');
  expect(document.querySelector('#indice').textContent).toContain('test');
});

test('muestra el listado de pokemones', () => {
  document.body.innerHTML = '<div id="indice"></div>';

  const nombrePokemones = ['charizard', 'bulbasaur'];
  const mockCallback = jest.fn(() => {});

  mostrarListadoPokemones(nombrePokemones, mockCallback);

  const $linkCharizard = document.querySelectorAll('#indice > a')[0];
  const $linkBulbasaur = document.querySelectorAll('#indice > a')[1];

  $linkCharizard.click();
  expect(mockCallback).toBeCalledWith('charizard');

  $linkBulbasaur.click();
  expect(mockCallback).toBeCalledWith('bulbasaur');

  expect($linkCharizard.outerHTML).toEqual(
    '<a class="list-group-item list-group-item-action" href="#">charizard</a>',
  );
  expect($linkBulbasaur.outerHTML).toEqual(
    '<a class="list-group-item list-group-item-action" href="#">bulbasaur</a>',
  );
});
