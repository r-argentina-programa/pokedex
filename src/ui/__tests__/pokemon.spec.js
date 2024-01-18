import mostrarPokemon from '../pokemon.js';
import Pokemon from '../../entidades/pokemon.js';
import Movimiento from '../../entidades/movimiento.js';

test('se muestra el pokemon', () => {
    const movimiento = new Movimiento('bola electrica', ['cristal', 'plata']);
    const pikachu = new Pokemon(25, 'Pikachu', 'imagen_pikachu.jpg', ['Electricidad'], ['Eléctrico'], [movimiento]);
    document.body.innerHTML = `
  <div class="card" id="pokemon-contenedor">
    <img class="card-img" id="pokemon-imagen" src="" alt="Imagen de pokemon"/>
  </div>
  <div id="ayuda"></div>
  <strong id="pokemon-nombre"></strong>
  <strong id="pokemon-id"></strong>
  <div id="tipos"></div>
  <div id="habilidades"></div>
  <table id="movimientos"></table>
`;
    mostrarPokemon(pikachu);

    expect(document.querySelector('#pokemon-imagen').src).toContain('imagen_pikachu.jpg');
    expect(document.querySelector('#ayuda').textContent).toContain('');
    expect(document.querySelector('#pokemon-nombre').textContent).toContain('Pikachu');
    expect(document.querySelector('#pokemon-id').textContent).toContain('25');
    expect(document.querySelector('#tipos span').textContent).toContain('Eléctrico');
    expect(document.querySelector('#movimientos tr th').textContent).toContain('bola electrica');

});
