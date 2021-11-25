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
    expect(Number(document.querySelector('#pokemon-id').textContent)).toEqual(pokemonFixture.id);
})

test("Chequea que asigne los tipos correctamente",()=>{
    const $tipos = document.querySelector("#tipos").children;
Object.values(pokemonFixture.tipos).forEach((tipo,i)=>{
expect($tipos[i].textContent).toEqual(tipo);
})
    
});

test("Chequea que asigne las habilidades correctamente",()=>{
    const $habilidades = document.querySelector("#habilidades").children;
    Object.values(pokemonFixture.habilidades).forEach((habilidad,i)=>{
        expect($habilidades[i].textContent).toEqual(habilidad)
    })
})

test("Chequea que asigne los movimientos correctamente",()=>{
    const $movimientos = document.querySelectorAll('#movimientos tr');
   
    $movimientos.forEach (($movimiento,i)=>{
        expect($movimiento.firstChild.textContent).toEqual(pokemonFixture.movimientos[i].nombre)
    
    const $versiones = $movimiento.lastChild.childNodes; 
    $versiones.forEach(($version,e)=>{
        expect($version.textContent).toEqual(pokemonFixture.movimientos[i].versiones[e]);
        })
})
})