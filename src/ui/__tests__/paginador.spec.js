import mostrarPaginador from "../paginador";

beforeEach(() => {
  document.body.innerHTML = '<div id="paginador"></div>';
});

const TOTAL_POKEMONES = 80;
const PAGINA_ACTUAL = 1;
const URL_SIGUIENTE = "https://www.pruebasiguiente.com/";
const URL_ANTERIOR = "https://www.pruebaanterior.com/";
const mockCallback = jest.fn();

describe("Tests de mostrarPaginador()", () => {
  test("Muestra paginador con url anterior", () => {
    mostrarPaginador(TOTAL_POKEMONES,PAGINA_ACTUAL,undefined,URL_ANTERIOR);
    expect(document.querySelector("#paginador a").href)
      .toBe("https://www.pruebaanterior.com/");
    expect(document.querySelector("#paginador a").className)
      .not.toBe("disabled");  
  });

  test("Muestra paginador con url siguiente", () => {
    mostrarPaginador(TOTAL_POKEMONES,PAGINA_ACTUAL,URL_SIGUIENTE);
    expect(document.querySelector("a[href='https://www.pruebasiguiente.com/']").textContent)
      .toBe("Siguiente");
  });

  test("Crea la cantidad de paginas necesarias", () => {
    mostrarPaginador(TOTAL_POKEMONES,PAGINA_ACTUAL,URL_SIGUIENTE,URL_ANTERIOR);
    expect(document.querySelectorAll("a[href='#']"))
      .toHaveLength(4);
  });

  test("LLama a la funcion de callback elegida por el usuario", () => {
    mostrarPaginador(TOTAL_POKEMONES,PAGINA_ACTUAL,URL_SIGUIENTE,URL_ANTERIOR,mockCallback);
    document.querySelector("a[href='#']").click();
    expect(mockCallback)
      .toHaveBeenCalledTimes(1);
  });

  test("Llama a la funcion de callback predeterminada", () => {
    mostrarPaginador(TOTAL_POKEMONES,PAGINA_ACTUAL,URL_SIGUIENTE,URL_ANTERIOR);
    document.querySelector("a[href='#']").click();
  });
});
