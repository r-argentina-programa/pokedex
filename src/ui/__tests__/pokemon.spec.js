import mostrarPokemon from "../pokemon.js";
import { mapearPokemon } from "../../mapeadores/pokemon.js";
import fixture from "../../__tests__/pokedex.fixture.js"
import bulbasaur from "../../../cypress/fixtures/bulbasaur.json"

describe("testea que funcione mostar el pokemon con mostrarPokemon", () => {

    const bulbasarMapeado = mapearPokemon(bulbasaur);
    const IMAGEN_BULBASAUR = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
    document.body.innerHTML = fixture;
    mostrarPokemon(bulbasarMapeado);

    it("verifica que cambie el display del contenedor del pokemon", () => {
        expect(getComputedStyle(document.querySelector("#pokemon-contenedor")).display).toEqual("block");
    });

    it("verifica que asigne la imagen del pokemon", () => {
        expect(document.querySelector("#pokemon-imagen").src)
            .toEqual(bulbasarMapeado.foto);

        expect(document.querySelector("#pokemon-imagen").alt)
            .toEqual(`Imagen frontal del pokemon ${bulbasarMapeado.nombre}`);
    });

    it("verifica que asigne nombre e id del pokemon", () => {
        expect(document.querySelector("#pokemon-nombre").textContent)
            .toEqual(bulbasarMapeado.nombre);

        expect(document.querySelector("#pokemon-id").textContent)
            .toEqual(`${bulbasarMapeado.id}`);
    });

    it("verifica que muestre los tipos del pokemon", () => {
        expect(document.querySelector("#tipos").children).toHaveLength(bulbasarMapeado.tipos.length);

        for(let i = 0; i < document.querySelector("#tipos").children.length ;i++){
            expect(document.querySelector("#tipos").children[i].textContent).toEqual(bulbasarMapeado.tipos[i]);
        }
    });

    it("verifica que muestre los movimientos del pokemon", () => {
        expect(document.querySelector("#movimientos").children).toHaveLength(bulbasarMapeado.movimientos.length);

        for(let i = 0; i < document.querySelector("#movimientos").children.length; i++){
            expect(document.querySelector("#movimientos").children[i].textContent).toEqual(bulbasarMapeado.movimientos[i].versiones.join(''));

        }
    });

    it("verifica que muestre las habilidades del pokemon", () => {
        expect(document.querySelector("#habilidades").children).toHaveLength(bulbasarMapeado.habilidades.length);

        for(let i = 0; i < document.querySelector("#habilidades").children.length ;i++){
            expect(document.querySelector("#habilidades").children[i].textContent).toEqual(bulbasarMapeado.habilidades[i]);
        }
    });



});