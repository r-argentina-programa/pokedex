import mostrarPaginador from "../paginador.js";
import { manejarCambioPagina } from "../paginador.js";
import datosPagina from "../../../cypress/fixtures/listado-pagina-1.json";
import fixture from "../../__tests__/pokedex.fixture.js";

describe("testea el funcionamiento del paginador", () =>{
    document.body.innerHTML = fixture;
    const mockPaginaSeleccionada = jest.fn();
    const $paginador = document.querySelector("#paginador");
    const PAGINA_ACTUAL = 1;
    const POKEMONES_POR_PAGINA = 20;
    const totalPaginas = Math.ceil(datosPagina.count/POKEMONES_POR_PAGINA);
    mostrarPaginador(datosPagina.count, PAGINA_ACTUAL, datosPagina.next, datosPagina.previous, mockPaginaSeleccionada);

    describe("testea que se muestre el paginador con la funcion mostrarPaginador", () => {
        it("testea que exista el boton Anterior", () =>{
            expect(document.querySelector(".page-link").textContent)
            .toEqual("Anterior");

            expect(document.querySelector(".page-link").href)
            .toContain(null);

            expect(document.querySelector(".page-link").dataset.pagina)
            .toEqual("Anterior");

            expect(document.querySelector(".page-item").className)
            .toContain("disabled");

        });

        it("testea que existan las paginas del paginador", ()=> {
            expect(document.querySelectorAll(".page-link"))
            .toHaveLength(totalPaginas+2);

            console.log(document.querySelectorAll(".page-link").length);
            expect(document.querySelectorAll(".page-item")[PAGINA_ACTUAL].classList)
            .toContain("active");

            for(let i = 1; i < totalPaginas - 1; i++){
                expect(document.querySelectorAll(".page-link")[i].dataset.pagina)
                .toEqual(`${i}`);

                expect(document.querySelectorAll(".page-link")[i].textContent)
                .toEqual(`${i}`);

                expect(document.querySelectorAll(".page-link")[i].href)
                .toContain("#");
            };
        });

        it("testea que exista el boton Anterior", () =>{
            const ultimaPosicionPaginador = document.querySelectorAll(".page-link").length -1;

            expect(document.querySelectorAll(".page-link")[ultimaPosicionPaginador].textContent)
            .toEqual("Siguiente");

            expect(document.querySelectorAll(".page-link")[ultimaPosicionPaginador].href)
            .toContain(datosPagina.next);

            expect(document.querySelectorAll(".page-link")[ultimaPosicionPaginador].dataset.pagina)
            .toEqual("Siguiente");

            expect(document.querySelectorAll(".page-item")[ultimaPosicionPaginador].className)
            .toEqual("page-item");

        });

        it("testea que se ejecute una función al clickear el paginador", () => {
            $paginador.click();

            expect(mockPaginaSeleccionada).toHaveBeenCalled();
        });

        it("testea que en la última página el boton 'Anterior' este activado y el boton 'Siguiente' este desactivado", () => {
            
            const ultimaPagina = document.querySelectorAll(".page-link").length-2;

            mostrarPaginador(datosPagina.count, ultimaPagina, null, true, mockPaginaSeleccionada);

            
            expect(document.querySelectorAll(".page-item")[0].className)
            .toEqual("page-item");

            expect(document.querySelectorAll(".page-item")[ultimaPagina+1].className)
            .toContain("disabled");
            
        })
    });

    describe("testea que el cambio de pagina funcione correctamente con manejarCambioPagina", () => {
        const numeroPagina = 5;
        const eventMock = {
           preventDefault: jest.fn(),
           target:{
                getAttribute: () => "#",
                dataset:{
                    pagina: numeroPagina
                }
           }
        }

        manejarCambioPagina(eventMock, mockPaginaSeleccionada);

        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(mockPaginaSeleccionada).toHaveBeenCalledTimes(1);
        expect(mockPaginaSeleccionada).toHaveBeenCalledWith(numeroPagina);
        
      
    });
});