import mostrarPaginador, { manejarCambioPagina } from "../paginador";

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

describe("Tests de manejarCambioPagina", () => {
  test("maneja cambio de pagina con una pagina numerada", () => {
    let mockEvento = {
      preventDefault: jest.fn(),
      target: {
        dataset:{
          pagina: "10"
        },
        getAttribute: jest.fn((atributoPedido) => {
          let atributos = {
            href: "#"
          }
          return atributos[atributoPedido];
        })
      }
    }

    manejarCambioPagina(mockEvento,mockCallback);
    expect(mockCallback)
      .toHaveBeenCalledWith(10)
  });

  test("Maneja cambio de pagina con pagina sin numerar", () => {
    jest.clearAllMocks();

    let mockEvento = {
      preventDefault: jest.fn(),
      target: {
        dataset:{
          pagina: "10"
        },
        getAttribute: jest.fn((atributoPedido) => {
          let atributos = {
            href: "https://hrefprueba.com/"
          }
          return atributos[atributoPedido];
        })
      }
    };

    manejarCambioPagina(mockEvento,mockCallback);

    expect(mockCallback)
      .toHaveBeenCalledTimes(1);
    expect(mockCallback)  
      .toHaveBeenCalledWith("https://hrefprueba.com/");
  });

  test("Maneja cambio de pagina con callback predeterminado", () => {
    let eventoMock = {
      preventDefault: jest.fn(),
      target:{
        dataset:{
          pagina: "11"
        },
        getAttribute: jest.fn((atributo) => {
          let atributos = {
            href: "https://prueba.com"
          }
          return atributos[atributo];
        })
      }
    };
    manejarCambioPagina(eventoMock);
  })
});
