import mostrarPokemon from '../pokemon.js';
import fixture from './pokemon.fixture.js';

test('muestra el pokemon', () => {
  document.body.innerHTML = fixture;
  const pokemon = {
    id: 1,
    nombre: 'nombre',
    foto: 'https://example.com/test.png',
    tipos: ['tipo1', 'tipo2'],
    habilidades: ['habilidad1', 'habilidad2'],
    movimientos: [
      {
        'movimiento': 'movimiento1',
        'versiones': ['version1', 'version2']
      },
      {
        'movimiento': 'movimiento2',
        'versiones': ['version3', 'version4']
      },
    ],
  };
  mostrarPokemon(pokemon);
  expect(document.querySelector('#pokemon-imagen').src).not.toBe('');

  expect(document.querySelector('#tipos').children.length).toBe(pokemon.tipos.length);
  expect(document.querySelector('#tipos').children[0].textContent).toBe(pokemon.tipos[0]);

  expect(document.querySelector('#habilidades').children.length).toBe(pokemon.habilidades.length);
  expect(document.querySelector('#habilidades').children[0].textContent).toBe(pokemon.habilidades[0]);

  expect(document.querySelector('#movimientos').children.length).toBe(pokemon.movimientos.length);
  expect(document.querySelector('#movimientos > tr:nth-child(1) > th').textContent).toBe(pokemon.movimientos[0].movimiento);

  expect(Number(document.querySelector('#pokemon-id').textContent)).toBe(pokemon.id);

  expect(document.querySelector('#pokemon-nombre').textContent).toBe(pokemon.nombre);
});
