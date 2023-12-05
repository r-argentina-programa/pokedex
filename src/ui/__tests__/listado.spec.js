import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

test('actualiza el texto de indice de pokemons', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  actualizarTextoIndicePokemones('test');
  expect(document.querySelector('#indice').textContent)
    .toContain('test');
});

test('muestra el listado de pokemones', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  mostrarListadoPokemones(['test'], jest.fn());
  expect(document.querySelector('#indice').children.length)
    .toBe(1);
  expect(document.querySelector('#indice').children[0].textContent)
    .toContain('test');
});
