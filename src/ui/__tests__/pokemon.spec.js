import mostrarPokemon from '../pokemon.js';

test('se muestra el pokemon', () => {
  document.body.innerHTML = `
    <p id="ayuda">Seleccioná un pokemon para ver su información</p>
    <div class="card" id="pokemon-contenedor">

        <div class="card-body">
            <h5 class="card-title"><strong id="pokemon-nombre">...</strong> (<strong
                    id="pokemon-id">...</strong>)</h5>

            <img class="card-img" id="pokemon-imagen" alt="Imagen de pokemon"/>

            <div id="tipos-contenedor">
                <strong>Tipos</strong>
                <div id="tipos">
                    <!-- -->
                </div>
            </div>

            <div id="habilidades-contenedor">
                <strong>Habilidades</strong>
                <div id="habilidades">
                    <!-- -->
                </div>
            </div>

            <div id="movimientos-contendor">
                <strong>Movimientos</strong>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Movimiento</th>
                        <th scope="col">Versiones</th>
                    </tr>
                    </thead>
                    <tbody id="movimientos">
                    <!-- -->
                    </tbody>
                </table>
            </div>
        </div>
</div>
`;

  const pokemonDataCharizard = {
    foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    habilidades: ['blaze', 'solar-power'],
    id: 6,
    nombre: 'charizard',
    tipos: ['fire', 'flying'],
    movimientos: [
      {
        nombre: 'mega-punch',
        versiones: [
          'red-blue',
          'yellow',
          'emerald',
          'sword-shield',
          'firered-leafgreen',
        ],
      },
    ],
  };

  mostrarPokemon(pokemonDataCharizard);
  const $imagen = document.querySelector('#pokemon-imagen');
  const $nombre = document.querySelector('#pokemon-nombre');
  const $id = document.querySelector('#pokemon-id');
  const $tipos = document.querySelectorAll('#tipos > span');
  const $habilidades = document.querySelectorAll('#habilidades > span');
  const $movimientos = document.querySelectorAll(
    '#movimientos > tr > td > span',
  );

  expect($imagen.getAttribute('src')).toBe(pokemonDataCharizard.foto);
  expect($nombre.textContent).toBe(pokemonDataCharizard.nombre);
  expect(Number($id.textContent)).toBe(pokemonDataCharizard.id);

  $tipos.forEach((tipo, index) => {
    expect(tipo.textContent).toBe(pokemonDataCharizard.tipos[index]);
  });

  $habilidades.forEach((habilidad, index) => {
    expect(habilidad.textContent).toBe(pokemonDataCharizard.habilidades[index]);
  });

  $movimientos.forEach((movimiento, index) => {
    expect(movimiento.textContent).toBe(
      pokemonDataCharizard.movimientos[0].versiones[index],
    );
  });
});
