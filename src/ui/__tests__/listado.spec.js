import {
  actualizarTextoIndicePokemones,
  mostrarListadoPokemones,
} from "../listado.js";

describe("testea la funcion mostrarListadoPokemones()", () => {
  let $indiceMock;
  const pokemonSeleccionadoCallbackMock = jest.fn();

  beforeEach(() => {
    document.body.innerHTML = "<div id=\"indice\"></div>";
    $indiceMock = document.querySelector("#indice");
    $indiceMock.innerHTML = "";
    pokemonSeleccionadoCallbackMock.mockClear();
  });

  test("crea los enlaces de pokemones correctamente", () => {
    const nombresPokemones = ["Pikachu", "Charizard", "Squirtle"];

    mostrarListadoPokemones(nombresPokemones, pokemonSeleccionadoCallbackMock);

    const $links = $indiceMock.querySelectorAll("a");
    expect($links.length).toBe(nombresPokemones.length);

    nombresPokemones.forEach((nombre, index) => {
      const $link = $links[index];

      expect($link.textContent).toBe(nombre);
      expect($link.className).toBe("list-group-item list-group-item-action");
      expect($link.getAttribute("href")).toBe("#");

      $link.click();
      expect(pokemonSeleccionadoCallbackMock).toHaveBeenCalledWith(nombre);
    });
  });
});

test("actualiza el texto \"Cargando...\"", () => {
  document.body.innerHTML = "<div id=\"indice\"></div>";
  actualizarTextoIndicePokemones("test");
  expect(document.querySelector("#indice").textContent).toContain("test");
});
