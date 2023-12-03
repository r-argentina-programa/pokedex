import mostrarPaginador, { manejarCambioPagina } from '../paginador';

test('maneja el cambio de pagina', () => {
  const callback = jest.fn();
  const e = {
    preventDefault: jest.fn(),
    target: {
      getAttribute: () => '#',
      dataset: {
        pagina: '1',
      },
    },
  };
  manejarCambioPagina(e, callback);
  expect(e.preventDefault)
    .toHaveBeenCalledTimes(1);
  expect(callback)
    .toHaveBeenCalledTimes(1);
  expect(callback)
    .toHaveBeenCalledWith(1);
});

test('muestra el paginador', () => {
  document.body.innerHTML = '<div id="paginador"></div>';
  mostrarPaginador(100, 1, '#', '#', jest.fn());
  expect(document.querySelector('#paginador').children.length).toBe(7);
  expect(document.querySelector('#paginador').children[0].classList.contains('disabled'));
});
