import { crearItemPaginador, manejarCambioPagina } from "../paginador.js";

test("crea un item en el paginador", () => {
  const texto = "Pagina 1";
  const url = "/pagina/1";

  const $item = crearItemPaginador(texto, url);

  expect($item.tagName).toBe("LI");
  expect($item.classList.contains("page-item")).toBe(true);

  const $link = $item.querySelector("a");
  expect($link.tagName).toBe("A");
  expect($link.classList.contains("page-link")).toBe(true);
  expect($link.textContent).toBe(texto);
  expect($link.href).toContain(url);
  expect($link.dataset.pagina).toBe(texto);
});

let callbackPaginaSeleccionada;

beforeEach(() => {
  callbackPaginaSeleccionada = jest.fn();
  document.body.innerHTML = `
        <ul id="paginador"></ul>
      `;
});

test("muestra el paginador correctamente", () => {
  const e = {
    preventDefault: jest.fn(),
    target: {
      getAttribute: jest.fn().mockReturnValue("#"),
      dataset: {
        pagina: "2",
      },
    },
  };

  manejarCambioPagina(e, callbackPaginaSeleccionada);

  expect(e.preventDefault).toHaveBeenCalled();
  expect(callbackPaginaSeleccionada).toHaveBeenCalledWith(2);
});

test("puede cambiar de pagina", () => {
  const mockEvent = {
    preventDefault: jest.fn(),
    target: {
      getAttribute: jest.fn().mockReturnValue("#"),
      dataset: { pagina: "10" },
    },
  };
  const mockCallback = jest.fn();

  manejarCambioPagina(mockEvent, mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(10);
});
