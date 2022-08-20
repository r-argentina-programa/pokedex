import { manejarCambioPagina } from "../paginador";
import mostrarPaginador from "../paginador.js";
import pokedexFixture from "../../__tests__/pokedex.fixture";

beforeEach(() => {
  document.body.innerHTML = pokedexFixture;
});

const mockCallBack = jest.fn();

test("prueba que manejar cambio de pagina sea llamada", () => {
  document.querySelector("#paginador").onclick = (e) => {
    manejarCambioPagina(e, mockCallBack);
  };
  document.querySelector("#paginador").click();
  expect(mockCallBack).toBeCalled();
});

test("prueba cambio de pagina con un numero", () => {
  document.querySelector("#paginador").onclick = (e) => {
    manejarCambioPagina(e, mockCallBack);
  };
  document.querySelector("#pagina-77").click();
  expect(mockCallBack).toHaveBeenCalledWith(77);
});

test("prueba cambio de pagina incorrecta", () => {
  document.querySelector("#paginador").onclick = (e) => {
    manejarCambioPagina(e, mockCallBack);
  };
  document.querySelector("#pagina-incorrecta").click();
  expect(mockCallBack).toHaveBeenCalledWith("");
});

const totalPokemones = 100;
const paginaActual = 7;
const urlSiguiente = "fake-url-next";
const urlAnterior = "fake-url-previous";
const POKEMONES_POR_PAGINA = 20;

test("prueba que el boton anterior este desactivado", () => {
  mostrarPaginador(
    totalPokemones,
    paginaActual,
    urlSiguiente,
    "",
    mockCallBack
  );
  const anterior = document.querySelector("#paginador > li.page-item.disabled");
  expect(anterior.textContent).toEqual("Anterior");
});

test("prueba que el boton siguiente este desactivado", () => {
  mostrarPaginador(totalPokemones, paginaActual, "", urlAnterior, mockCallBack);
  const anterior = document.querySelector("#paginador > li.page-item.disabled");
  expect(anterior.textContent).toEqual("Siguiente");
});
