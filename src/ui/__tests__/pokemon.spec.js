import mostrarPokemon from '../pokemon.js';
import fixture from './cuadro-pokemon-fixture.js';

const parametros = {
  id: 1,
  nombre: 'bulbasaur',
  foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  tipos: ['grass', 'poison'],
  habilidades: ['overgrow', 'chlorophyll'],
  movimientos: [{ nombre: 'razor-wind', versiones: ['gold-silver', 'crystal'] }],
};

test('testear mostrar las imagenes', () => {
  document.body.innerHTML = fixture;
  mostrarPokemon(parametros);
  expect(document.querySelector('#pokemon-imagen').src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
});
