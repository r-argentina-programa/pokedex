/// <reference types="Jest" />
import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from "../listado.js";
import listadoFixture from "../../../cypress/fixtures/listado-pagina-1.json"

describe("listado", () => {
    it("testea que actualizarTextoIndicePokemones funcione correctamente", () => {
        document.body.innerHTML = "<div id='indice'></div>";
        actualizarTextoIndicePokemones("hola");

        expect(document.querySelector("#indice").textContent).toEqual("hola");
    });

    it("testea que se muestre el listado de pokemons con mostrarListadoPokemones", () => {
        const mockPokemonSeleccionadoCallBack = jest.fn();
        document.body.innerHTML = "<div id='indice'></div>";
        let nombresPokemones = [];
        for(let i = 0; i < listadoFixture.results.length; i++){
            nombresPokemones.push(listadoFixture.results[i].name);
        };
        
        mostrarListadoPokemones(nombresPokemones, mockPokemonSeleccionadoCallBack);
        expect(document.querySelector("#indice").children).toHaveLength(listadoFixture.results.length);

        for(let i = 0; i < listadoFixture.results.length; i++){
            expect(document.querySelector("#indice").children[i].className).toEqual("list-group-item list-group-item-action");
            expect(document.querySelector("#indice").children[i].textContent).toEqual(listadoFixture.results[i].name);
            expect(document.querySelector("#indice").children[i].href).toContain("#");
            document.querySelector("#indice").children[i].click();
        

        };

        expect(mockPokemonSeleccionadoCallBack).toHaveBeenCalledTimes(listadoFixture.results.length);


    });
    
});