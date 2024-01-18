import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

test('actualiza el texto de indice del pokemon', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  actualizarTextoIndicePokemones('1');
  expect(document.querySelector(('#indice')).textContent)
    .toContain('1');
});

test('muestra el listado de pokemones', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  const nombresPokemons = ['pikachu', 'bulbasaur', 'charmander'];
  mostrarListadoPokemones(nombresPokemons, () => { });

  let nombrePokemonsDevueltos=[];

  expect(document.querySelectorAll(('#indice a')))
    .toHaveLength(3);

 document.querySelectorAll(('#indice a')).forEach((e) => { 
    nombrePokemonsDevueltos.push(e.textContent);
  });
  
  expect(nombrePokemonsDevueltos).toEqual(nombresPokemons);
});





