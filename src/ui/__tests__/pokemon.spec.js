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
        nombre: 'movimiento1',
        versiones: ['version1', 'version2'],
      },
      {
        nombre: 'movimiento2',
        versiones: ['version3', 'version4'],
      },
    ],
  };
  mostrarPokemon(pokemon);
  expect(document.querySelector('#pokemon-imagen').src).not.toBe('');
});
