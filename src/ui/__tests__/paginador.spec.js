/* eslint-disable linebreak-style */

import { manejarCambioPagina, mostrarPaginador } from '../paginador.js';

test('Comprobacion paginador. Deshabilitar boton anterior.', () => {
  const totalPokemons = 100;
  const pokemonsPorPagina = 20;
  const paginaActual = 1;
  const urlAnterior = 'www.exampleback.com';
  const urlSiguiente = 'www.example.com';
  const mockPagina = jest.fn();

  document.body.innerHTML = '<ul id="paginador"></ul>';

  mostrarPaginador(
    totalPokemons,
    paginaActual,
    urlSiguiente,
    urlAnterior,
    mockPagina,
  );

  const $contenedorPaginas = document.querySelectorAll('#paginador li');
  expect($contenedorPaginas[0].className).toContain('disabled');

  expect($contenedorPaginas.length)
    .toBe(totalPokemons / pokemonsPorPagina);

  $contenedorPaginas[2].click();
  expect(mockPagina)
    .toBeCalledTimes(1);
});

test('Comprobar cambio de pagina', () => {
  const evento = {
    preventDefault: jest.fn(),
    target: {
      getAttribute: jest.fn(() => '#'),
      dataset: {
        pagina: 7,
      },
    },
  };

  const mockCallback = jest.fn();

  manejarCambioPagina(evento, mockCallback);
  expect(mockCallback)
    .toBeCalledWith(7);

  expect(mockCallback)
    .toBeCalledTimes(1);
});
