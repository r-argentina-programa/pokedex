import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';

test('Se asegura que haga el llamado para cambiar a la pagina url.com', () => {
  const mockEvent = {
    preventDefault: () => {},
    target: {
      getAttribute: jest.fn(() => 'url.com'),
      dataset: '4',
    },
  };
  const mockCallback = jest.fn();
  manejarCambioPagina(mockEvent, mockCallback);

  expect(mockCallback).toHaveBeenCalledWith('url.com');
});

test('Se asegura que haga el llamado para cambiar a la pagina 4', () => {
  const mockEvent = {
    preventDefault: () => {},
    target: {
      getAttribute: jest.fn(() => '#'),
      dataset: { pagina: '4' },
    },
  };
  const mockCallback = jest.fn();
  manejarCambioPagina(mockEvent, mockCallback);

  expect(mockCallback).toHaveBeenCalledWith(4);
});

test('Se asegura que muestre el paginador', () => {
  const mockCall = {
    totalPokemon: 100,
    paginas: {
      actual: 1,
      siguiente: 'urlSiguiente',
      anterior: 'urlAnterior',
    },
    callback: jest.fn(),
  };

  const { totalPokemon, paginas, callback } = mockCall;
  const { actual, siguiente, anterior } = paginas;

  document.body.innerHTML = '<div id="paginador"></div>';
  const $paginador = document.querySelector('#paginador');

  mostrarPaginador(totalPokemon, actual, siguiente, anterior, callback);
  expect($paginador.textContent).toMatch('1');

  $paginador.click();
  expect(callback).toBeCalled();
});

test('muestra el paginador sin url siguiente ni callback', () => {
  const mockCall = {
    totalPokemon: 100,
    paginas: {
      actual: 1,
      siguiente: null,
      anterior: 'urlAnterior',
    },
  };

  const { totalPokemon, paginas } = mockCall;
  const { actual, siguiente, anterior } = paginas;

  document.body.innerHTML = '<div id="paginador"></div>';

  mostrarPaginador(totalPokemon, actual, siguiente, anterior);

  const $paginaSiguiente = document.querySelector('[data-pagina="Siguiente"]');
  expect($paginaSiguiente.href).toMatch('null');
});
