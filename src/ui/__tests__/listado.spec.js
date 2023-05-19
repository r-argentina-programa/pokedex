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

  mostrarListadoPokemones(nombrePokemones);

  const linkCharizard = document.querySelectorAll('#indice > a')[0].outerHTML;
  const linkBulbasaur = document.querySelectorAll('#indice > a')[1].outerHTML;

  expect(linkCharizard).toEqual(
    '<a class="list-group-item list-group-item-action" href="#">charizard</a>',
  );
  expect(linkBulbasaur).toEqual(
    '<a class="list-group-item list-group-item-action" href="#">bulbasaur</a>',
  );
});
