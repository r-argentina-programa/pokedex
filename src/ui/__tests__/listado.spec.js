import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

describe('pruebas de listado', () => {
  it('actualiza el texto de indice de pokemons', () => {
    document.body.innerHTML = '<div id="indice"></div>';
    actualizarTextoIndicePokemones('test');
    expect(document.querySelector('#indice').textContent)
      .toContain('test');
  });
  
  it('muestra el listado de pokemones', () => {
    document.body.innerHTML = '<div id="indice"></div>';
    mostrarListadoPokemones(['test'], jest.fn());
    expect(document.querySelector('#indice').children.length)
      .toBe(1);
    expect(document.querySelector('#indice').children[0].textContent)
      .toContain('test');
  });
  
  it('hace click al boton de pokemon', async () => {
    document.body.innerHTML = '<div id="indice"></div>';
    const funcionEspia = jest.fn();
    mostrarListadoPokemones(['test'], funcionEspia);
    const eventoClick = new Event('click');
    document.querySelector('.list-group-item').dispatchEvent(eventoClick);
    expect(funcionEspia).toHaveBeenCalledWith('test');
  });
});