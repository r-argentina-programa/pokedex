import mostrarPaginador, { manejarCambioPagina } from '../paginador';

describe('maneja el cambio de página', () => {
  it('cambia a la página numero 1', () => {
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
  it('cambia la página por referencia', () => {
    const callback = jest.fn();
    const testConst = '';
    const e = {
      preventDefault: jest.fn(),
      target: {
        getAttribute: () => testConst,
        dataset: {
          pagina: '',
        },
      },
    };
    manejarCambioPagina(e, callback);
    expect(e.preventDefault)
      .toHaveBeenCalledTimes(1);
    expect(callback)
      .toHaveBeenCalledTimes(1);
    expect(callback)
      .toHaveBeenCalledWith(testConst);
  });
});

describe('muestra el paginador', () => {
  it('prueba la creacion de url anterior y siguiente no deshabilitados', () => {
    document.body.innerHTML = '<div id="paginador"></div>';
    mostrarPaginador(100, 1, true, true, jest.fn());
    expect(document.querySelector('#paginador').children.length).toBe(7);
    expect(document.querySelector('#paginador').children[0].classList.contains('disabled')).toBeFalsy();
    expect(document.querySelector('#paginador').lastChild.classList.contains('disabled')).toBeFalsy();
  });

  it('prueba la creacion de url anterior y siguiente deshabilitados', () => {
    document.body.innerHTML = '<div id="paginador"></div>';
    mostrarPaginador(100, 1, false, false, jest.fn());
    expect(document.querySelector('#paginador').children.length).toBe(7);
    expect(document.querySelector('#paginador').children[0].classList.contains('disabled')).toBeTruthy();
    expect(document.querySelector('#paginador').lastChild.classList.contains('disabled')).toBeTruthy();
  });

});
