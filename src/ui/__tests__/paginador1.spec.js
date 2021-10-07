import mostrarPaginador from "../paginador";
import fixture from "./paginador.fixture"

document.body.innerHTML = fixture;

describe("Muestra el paginador", ()=>{
    const totalPokemones = 1118;
    const paginaActualPrueba = 5;
    const urlPrueba = "url-de-prueba"
    const mockCallback = jest.fn()
it("Chequea el número de páginas",()=>{
    mostrarPaginador(totalPokemones,paginaActualPrueba, urlPrueba, urlPrueba, mockCallback);
    const $paginas = document.querySelector("#paginador").childNodes;
    expect($paginas).toHaveLength(58)
})

it("Chequea que solo la página actual esté activa",()=>{
    mostrarPaginador(totalPokemones,paginaActualPrueba, urlPrueba, urlPrueba, mockCallback);
    const $paginaActiva = document.querySelectorAll(".active");
    expect($paginaActiva).toHaveLength(1);
    expect($paginaActiva[0].textContent).toEqual("5");
})
it("Chequea que las páginas sin url estén desactivadas",()=>{
    mostrarPaginador(totalPokemones,paginaActualPrueba, urlPrueba,"", mockCallback);
let $paginaDesactivada = document.querySelector(".disabled");
expect($paginaDesactivada.textContent).toEqual("Anterior");
mostrarPaginador(totalPokemones,paginaActualPrueba, "",urlPrueba, mockCallback);
 $paginaDesactivada = document.querySelector(".disabled");
expect($paginaDesactivada.textContent).toEqual("Siguiente");})
})