import mostrarPokemon from '../pokemon.js';

describe('mostrarPokemon', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
    types: [
      {
        type: {
          name: 'electric',
        },
      },
    ],
    abilities: [
      {
        ability: {
          name: 'static',
        },
      },
    ],
    moves: [
      {
        move: {
          name: 'thunderbolt',
        },
        version_group_details: [
          {
            version_group: {
              name: 'ultra-sun-ultra-moon',
            },
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pokemon-contenedor">
        <div id="ayuda"></div>
        <img id="pokemon-imagen" />
        <h2 id="pokemon-nombre"></h2>
        <p id="pokemon-id"></p>
        <div id="tipos"></div>
        <div id="habilidades"></div>
        <table><tbody id="movimientos"></tbody></table>
      </div>
    `;
  });

  it('la información del pokemón se muestra en pantalla', () => {
    mostrarPokemon(pokemon);
    expect(document.querySelector('#pokemon-contenedor').style.display).toBe('block');
    expect(document.querySelector('#ayuda').textContent).toBe('');
    expect(document.querySelector('#pokemon-imagen').getAttribute('src')).toBe(pokemon.sprites.front_default);
    expect(document.querySelector('#pokemon-imagen').getAttribute('alt')).toBe(`Imagen frontal del pokemon ${pokemon.name}`);
    expect(document.querySelector('#pokemon-nombre').textContent).toBe(pokemon.name);
    expect(document.querySelector('#pokemon-id').textContent).toBe(pokemon.id.toString());
  });

  it('los tipos del pokemón se muestran en pantalla', () => {
    mostrarPokemon(pokemon);
    expect(document.querySelectorAll('#tipos .badge').length).toBe(1);
    expect(document.querySelector('#tipos .badge').textContent).toBe(pokemon.types[0].type.name);
  });

  it('las habilidades del pokemón se muestran en pantalla', () => {
    mostrarPokemon(pokemon);
    expect(document.querySelectorAll('#habilidades .badge').length).toBe(1);
    expect(document.querySelector('#habilidades .badge').textContent).toBe(pokemon.abilities[0].ability.name);
  });

  it('los movimientos del pokemón se muestran en pantalla', () => {
    mostrarPokemon(pokemon);
    expect(document.querySelectorAll('#movimientos tr').length).toBe(1);
    expect(document.querySelector('#movimientos tr th').textContent).toBe(pokemon.moves[0].move.name);
    expect(document.querySelectorAll('#movimientos tr td .badge').length).toBe(1);
    expect(document.querySelector('#movimientos tr td .badge').textContent).toBe(pokemon.moves[0].version_group_details[0].version_group.name);
  });
});
