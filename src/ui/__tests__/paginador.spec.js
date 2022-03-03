import pagina1Fixture from './pagina1-fixture.js';
import pagina56Fixture from './pagina56-fixture.js';
import mostrarPaginador from '../paginador.js';
import { manejarCambioPagina } from '../paginador.js';

test('Testear que el boton pagina anterior no tenga la clase disable', () => {
  document.body.innerHTML = pagina1Fixture;
  const totalPokemones = 1126;
  const paginaActual = 1;
  const siguienteUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20';
  const anteriorUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
  const mockCallBack = jest.fn();


  mostrarPaginador(totalPokemones, paginaActual, siguienteUrl, anteriorUrl, mockCallBack);
  expect(document.querySelector('li').className).toBe('page-item');
});

test('Testear que el boton pagina siguiente tenga la clase disable', () => {
  document.body.innerHTML = pagina56Fixture;
  const totalPokemones = 1126;
  const paginaActual = 57;
  const siguienteUrl = null;
  const anteriorUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=1100&limit=20';
  const mockCallBack = jest.fn();


  mostrarPaginador(totalPokemones, paginaActual, siguienteUrl, anteriorUrl, mockCallBack);
  expect(document.querySelectorAll('.page-item')[58].className).toBe('page-item disabled');
});


test('Teastear hacer click al paginador sin numero', () => {
  document.body.innerHTML = pagina56Fixture;
  const mock = jest.fn();
  document.querySelector('#paginador').onclick = (e) => {
    manejarCambioPagina(e, mock);
  };
  document.querySelector('#paginador').click();
  expect(mock).toBeCalled();
});
