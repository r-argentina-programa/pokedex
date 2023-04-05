import mostrarPokemon from "../pokemon";
import pokedexFixture from "../../__tests__/pokedex.fixture";

let pokemon = {
  id: 1,
  nombre: "bulbasaur",
  foto: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
  tipos: ["grass", "poison"],
  habilidades: ["overgrow","chlorophyll"],
  movimientos: [
    {nombre: "movimiento1", versiones:["version1","version2"]},
    {nombre: "movimiento2", versiones:["versionA","versionB","versionC"]}
  ]
}; 

beforeAll(() => {
  document.body.innerHTML = pokedexFixture;
  mostrarPokemon(pokemon);
})

test("Agrega la imagen del pokemon",() => {
  expect(document.querySelector("#pokemon-imagen").src)
    .toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg");
});

test("Agrega el nombre del pokemon", () => {
  expect(document.querySelector("#pokemon-nombre").textContent)
    .toBe("bulbasaur");
});

test("Agrega los tipos del pokemon", () => {
  expect(document.querySelectorAll("#tipos span"))
    .toHaveLength(2);
});

test("Agrega las habilidades del pokemon",() => {
  expect(document.querySelectorAll("#habilidades .badge"))
  .toHaveLength(2);
});

test("Agrega los movimientos del Pokemon y sus versiones", () => {
  expect(document.querySelectorAll("#movimientos th"))
  .toHaveLength(2);

  expect(document.querySelectorAll("#movimientos td .badge"))
  .toHaveLength(5);
});
