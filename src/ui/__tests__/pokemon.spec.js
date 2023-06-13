import fixture from '../../__tests__/pokedex.fixture.js';
import mostrarPokemon from '../pokemon.js';


describe('Se asegura que la informacion del pokemon se genera correctamente', () => {
  document.body.innerHTML = fixture;
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'http://bulbasaur.jpg/' },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }],
    moves: [{ move: { name: 'razor-wind' }, version_group_details: [{ version_group: { name: 'gold-silver' } }, { version_group: { name: 'crystal' } }] }, { move: { name: 'swords-dance' }, version_group_details: [{ version_group: { name: 'red-blue' } }, { version_group: { name: 'yellow' } }] }],
  };

  mostrarPokemon(mockPokemon);

  it('Se asegura que el display del contenedor pokemon sea block', () => {
    expect(document.querySelector('#pokemon-contenedor').style.display).toBe('block');
  });

  it('Se asegura que el texto ayuda haya sido actualizado', () => {
    expect(document.querySelector('#ayuda').textContent).toBe('');
  });

  it('Se asegura que el src de la imagen sea el correcto', () => {
    expect(document.querySelector('#pokemon-imagen').src).toBe('http://bulbasaur.jpg/');
  });

  it('Se asegura de que el nombre mostrado sea el correcto', () => {
    expect(document.querySelector('#pokemon-nombre').textContent).toBe('bulbasaur');
  });

  it('Se asegura que el id mostrado sea el correcto', () => {
    expect(document.querySelector('#pokemon-id').textContent).toBe('1');
  });

  it('Se asegura que tenga dos placas de tipos pokemon', () => {
    expect(document.querySelector('#tipos').childNodes.length).toBe(2);
  });

  it('Se asegura que las placas sean del tipo correcto', () => {
    expect(document.querySelector('#tipos').childNodes[0].textContent).toBe('grass');
    expect(document.querySelector('#tipos').childNodes[1].textContent).toBe('poison');
  });

  it('Se asegura que el pokemon tenga 2 habilidades', () => {
    expect(document.querySelector('#habilidades').childNodes.length).toBe(2);
  });

  it('Se asegura que las habilidades sean las correctas', () => {
    expect(document.querySelector('#habilidades').childNodes[0].textContent).toBe('overgrow');
    expect(document.querySelector('#habilidades').childNodes[1].textContent).toBe('chlorophyll');
  });

  it('Se asegura que el pokemon tenga 2 movimientos', () => {
    expect(document.querySelector('#movimientos').children.length).toBe(2);
  });

  it('Se asegura que las movimientos sean las correctas', () => {
    expect(document.querySelector('#movimientos').children[0].childNodes[0].textContent).toBe('razor-wind');
    expect(document.querySelector('#movimientos').children[1].childNodes[0].textContent).toBe('swords-dance');
  });

  it('Se asegura que las versiones del primer movimiento sean correctas', () => {
    expect(document.querySelector('#movimientos').children[0].childNodes[1].childNodes[0].textContent).toBe('gold-silver');
    expect(document.querySelector('#movimientos').children[0].childNodes[1].childNodes[1].textContent).toBe('crystal');
  });

  it('Se asegura que las versiones del segundo movimiento sean correctas', () => {
    expect(document.querySelector('#movimientos').children[1].childNodes[1].childNodes[0].textContent).toBe('red-blue');
    expect(document.querySelector('#movimientos').children[1].childNodes[1].childNodes[1].textContent).toBe('yellow');
  });
});
