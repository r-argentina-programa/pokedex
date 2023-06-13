import { mostrarListadoPokemones } from '../listado.js';

test('Se asegura que el listado de pokemon este completo', () => {
  document.body.innerHTML = '<div class="list-group" id="indice">';
  mostrarListadoPokemones(['Bulbasaur', 'Charmander', 'Squirtle']);
  const $pokemon = document.querySelectorAll('#indice a');
  expect($pokemon).toHaveLength(3);
});

test('Se asegura que al dar click a un link se ejecute la funcion pasada', () => {
  const miMock = jest.fn();

  document.body.innerHTML = '<div class="list-group" id="indice">';
  mostrarListadoPokemones(['Bulbasaur', 'Charmander', 'Squirtle'], miMock());
  const $pokemon = document.querySelectorAll('#indice a');
  $pokemon[1].click();
  expect(miMock).toHaveBeenCalledTimes(1);
});
