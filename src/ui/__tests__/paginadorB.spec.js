import mostrarPaginador from "../paginador";
import fixture from "./paginador.fixture"

document.body.innerHTML = fixture;
    const totalPokemones = 1118;
    const paginaActualPrueba = 5;
    const urlPrueba = "url-de-prueba"
    const mockCallback = jest.fn()

describe("Muestra el paginador", ()=>{

    it("Chequea el número de páginas",()=>{
    mostrarPaginador(totalPokemones,paginaActualPrueba, urlPrueba, urlPrueba, mockCallback);
    const $paginas = document.querySelector("#paginador").childNodes;
    expect($paginas).toHaveLength(58)
})
mostrarPaginador(totalPokemones,paginaActualPrueba, urlPrueba, urlPrueba, mockCallback);
  
it("Chequea que solo una página esté activa",()=>{
    const $paginaActiva = document.querySelectorAll(".active");
    expect($paginaActiva).toHaveLength(1);
    })

it("Chequea que la ṕágina activa sea la página actual",()=>{
    const $paginaActiva = document.querySelectorAll(".active");
    expect($paginaActiva[0].textContent).toEqual("5");
})

it("Chequea que el botón 'Anterior' esté desactivado al no tener 'urlAnterior'",()=>{
    mostrarPaginador(totalPokemones,1, urlPrueba,"", mockCallback);
const $paginaDesactivada = document.querySelector(".disabled");
expect($paginaDesactivada.textContent).toEqual("Anterior");})

it("Chequea que el botón 'Siguiente' esté desactivado al no tener 'urlSiguiente'",()=>{
    mostrarPaginador(totalPokemones,paginaActualPrueba, "",urlPrueba, mockCallback);
 const $paginaDesactivada = document.querySelector(".disabled");
expect($paginaDesactivada.textContent).toEqual("Siguiente");})
})
