import { mostrarListadoPokemones, actualizarTextoIndicePokemones } from "../listado";

const callbackPokemon = jest.fn();
const listaPokemones = ["Pikachu","Ash","Charizard"];

beforeEach(() => {
  document.body.innerHTML = '<div id="indice"></div>';
})

test("Actualiza el texto del indicePokemones", () => {
  actualizarTextoIndicePokemones("Prueba");
  expect(document.querySelector("#indice").textContent)
    .toBe("Prueba")
});

test("Muestra el listado de pokemones con callback elegida por el usuario", () => {
  mostrarListadoPokemones(listaPokemones,callbackPokemon);
  document.querySelector("a").click();
  expect(callbackPokemon)
    .toHaveBeenCalledTimes(1);
});

test("Muestra el listado de pokemones con parametros predeterminados", () => {
  mostrarListadoPokemones(listaPokemones);
  document.querySelector("a").click();
  expect(document.querySelector("a").textContent)
    .toBe("Pikachu");
});
