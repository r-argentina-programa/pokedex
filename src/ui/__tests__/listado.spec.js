import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js'

const nombresPokemones = ["swanna", "vanillite", "vanillish", "vanilluxe", "deerling", "sawsbuck", "emolga", "karrablast", "escavalier", "foongus", "amoonguss", "frillish", "jellicent", "alomomola", "joltik", "galvantula", "ferroseed", "ferrothorn", "klink", "klang"]

document.body.innerHTML = "<div id='indice'> </div>"

test('actualiza texto de indice pokemones', () => {
    actualizarTextoIndicePokemones('test');
    expect(document.querySelector('#indice').textContent)
        .toContain('test');
});

const mockCallBack = jest.fn();

describe('Muestra el listado de pokemones', () => {

    it('Muestra 20 pokemones',
        () => {
            mostrarListadoPokemones(nombresPokemones, mockCallBack);
            expect(document.querySelectorAll('#indice .list-group-item')).toHaveLength(20);
        });
    it('Asigna todos los pokemones correctamente', () => {
        mostrarListadoPokemones(nombresPokemones, mockCallBack);
        let pokemonesEnLista = [];
        document.querySelectorAll('#indice .list-group-item').forEach(itemListado => {
            pokemonesEnLista.push(itemListado.textContent);
        });
        expect(pokemonesEnLista).toEqual(nombresPokemones);
    });
    it('Asigna callback a todos los pokemones listados', () => {
        mostrarListadoPokemones(nombresPokemones, mockCallBack);
        document.querySelectorAll("#indice .list-group-item").forEach(itemListado => {
            itemListado.click();
        })
        expect(mockCallBack).toHaveBeenCalledTimes(20);
    });


});