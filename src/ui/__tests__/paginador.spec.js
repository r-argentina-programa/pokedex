import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('se muestra el paginador', () => {
  document.body.innerHTML = '<ul id="paginador"></ul>';
  const totalPokemones = 60;
  const paginaActual = 2;
  const urlSiguiente = 'siguiente.com';
  const urlAnterior = 'anterior.com';

  mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, () => { });

  expect(document.querySelectorAll(('#paginador li')))
    .toHaveLength(5);

  expect(document.querySelectorAll('#paginador a')[0].textContent).toContain('Anterior');
  expect(document.querySelectorAll('#paginador a')[1].textContent).toContain('1');
  expect(document.querySelectorAll('#paginador a')[2].textContent).toContain('2');
  expect(document.querySelectorAll('#paginador a')[3].textContent).toContain('3');
  expect(document.querySelectorAll('#paginador a')[4].textContent).toContain('Siguiente');
});

test('se maneja el cambio de pagina caso valido', () => {

  document.body.innerHTML = '<a href="#" id="pagina2" data-pagina="2" >2</a>';
  const $pagina = document.querySelector('#pagina2');
  const mockCallback = jest.fn();

  manejarCambioPagina({ preventDefault: jest.fn(), target: $pagina }, mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(2);
});

test('se maneja el cambio de pagina caso invalido', () => {

  document.body.innerHTML = '<a  id="pagina2" data-pagina="2" >2</a>';
  const $pagina = document.querySelector('#pagina2');
  const mockCallback = jest.fn();

  manejarCambioPagina({ preventDefault: jest.fn(), target: $pagina }, mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(null);
});
