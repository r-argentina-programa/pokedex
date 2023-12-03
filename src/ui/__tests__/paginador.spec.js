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
