import mostrarPokemon from "../pokemon";
import pokedexFixture from "../../__tests__/pokedex.fixture";
import bulbasaurFixture from "./bulbasaurFixture.json";

test("prueba mostrar un pokemon", () => {
  document.body.innerHTML = pokedexFixture;
  mostrarPokemon(bulbasaurFixture);
  expect(document.querySelector("#pokemon-imagen").src).toBe(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  );
  expect(document.querySelector("#pokemon-nombre").textContent).toBe(
    bulbasaurFixture.nombre
  );
});
