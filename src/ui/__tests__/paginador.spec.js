import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';
import primeraPagina from '../../../cypress/fixtures/listado-pagina-1.json';
import segundaPagina from '../../../cypress/fixtures/listado-pagina-2.json';
import ultimaPagina from '../../../cypress/fixtures/listado-pagina-49.json';

describe('La funcion pasada a manejarCambioPagina se ejecuta con los parametros correctos', () => {
  const $a = document.createElement('a');
  const mockCallbackFunction = jest.fn();

  $a.addEventListener('click', (event) => {
    manejarCambioPagina(event, mockCallbackFunction);
  });

  test('Cambiar de pagina sin una url', () => {
    $a.href = '#';
    $a.dataset.pagina = '5';
    $a.click();

    expect(mockCallbackFunction).toHaveBeenCalledWith(5);
  });

  test('Cambiar de pagina con una url definida en el elemento', () => {
    $a.href = 'falsaURL.com';
    $a.click();

    expect(mockCallbackFunction).toHaveBeenCalledWith('falsaURL.com');
  });
});

describe('Los atributos dislabed y active se aplica correctamente en el paginador', () => {
  beforeEach(() => {
    document.body.innerHTML = `<nav aria-label="Page navigation example">
    <ul class="pagination flex-wrap" id="paginador"></ul>
  </nav>`;
  });

  test('El elemento "anterior" y el "siguiente" se setean correctamente en la primera pagina', () => {
    const {
      count: totalPokemones,
      next: urlSiguiente,
      previous: urlAnterior,
    } = primeraPagina;
    const paginaActual = 1;

    mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior);
    const listado = document.querySelectorAll('#paginador > .page-item');

    expect(listado[0].className).toContain('disabled');
    expect(listado[listado.length - 1].className).not.toContain('disabled');
    expect(listado[paginaActual].className).toContain('active');
  });

  test('El elemento "anterior" y el "siguiente" se setean correctamente en la segunda pagina', () => {
    const {
      count: totalPokemones,
      next: urlSiguiente,
      previous: urlAnterior,
    } = segundaPagina;
    const paginaActual = 2;

    mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior);
    const listado = document.querySelectorAll('#paginador > .page-item');

    expect(listado[0].className).not.toContain('disabled');
    expect(listado[listado.length - 1].className).not.toContain('disabled');
    expect(listado[paginaActual].className).toContain('active');
  });

  test('El elemento "anterior" y el "siguiente" se setean correctamente en la ultima pagina', () => {
    const {
      count: totalPokemones,
      next: urlSiguiente,
      previous: urlAnterior,
    } = ultimaPagina;
    const paginaActual = 49;

    mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior);
    const listado = document.querySelectorAll('#paginador > .page-item');

    expect(listado[0].className).not.toContain('disabled');
    expect(listado[listado.length - 1].className).toContain('disabled');
    expect(listado[paginaActual].className).toContain('active');
  });
});
