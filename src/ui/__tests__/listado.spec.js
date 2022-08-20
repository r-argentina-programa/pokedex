import {
  actualizarTextoIndicePokemones,
  mostrarListadoPokemones,
} from "../listado";

const arrayTest = ["test1", "test2", "test3"];
const mockCallBack = jest.fn();

test("actualiza el texto indice pokemones", () => {
  document.body.innerHTML = '<div id="indice"></div>';
  actualizarTextoIndicePokemones("test");
  expect(document.querySelector("#indice").textContent).toContain("test");
});

test("muestra el listado de pokemones", () => {
  mostrarListadoPokemones(arrayTest, mockCallBack);
  expect(document.querySelectorAll(".list-group-item")).toHaveLength(
    arrayTest.length
  );
});

test("prueba el callback en los pokemones", () => {
  mostrarListadoPokemones(arrayTest, mockCallBack);
  document.querySelectorAll(".list-group-item").forEach((element) => {
    element.click();
  });
  expect(mockCallBack).toHaveBeenCalledTimes(arrayTest.length);
});
