import mostrarPokemon from "../pokemon"
import fixture from "./pokemon.fixture"
import pokemonFixture from './pokemon.fixture.json'

document.body.innerHTML = fixture;
mostrarPokemon(pokemonFixture)

test("Chequea que actualice correctamente el texto de ayuda",()=>{
    expect(document.querySelector(('#ayuda')).textContent)
    .toEqual('')
})

test ("Chequea que asigne correctamente los datos básicos",()=>{
    expect(document.querySelector("#pokemon-imagen").src).toEqual("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png")
    expect(document.querySelector("#pokemon-imagen").alt).toEqual(`Imagen frontal del pokemon ${pokemonFixture.nombre}`)
    expect(document.querySelector("#pokemon-nombre").textContent).toEqual(pokemonFixture.nombre);
    expect(document.querySelector('#pokemon-id').textContent).toEqual(pokemonFixture.id);
})

test("Chequea que se llaman las funciones derivadas",()=>{
    expect(mostrarTipos).toHaveBeenCalledWith(pokemonFixture.tipos)
});