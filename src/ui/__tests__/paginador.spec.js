// Testear manejar cambio de pagina y mostrar paginador
import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';

test('muestra paginador', () => {
  document.body.innerHTML = '<div id="paginador"></div>';

  const totalPokemones = 1000;
  const pokemonesPorPagina = 20;
  const cantidadDePaginas = Math.ceil(totalPokemones / pokemonesPorPagina);
  const paginaActual = 'https://www.pageactual.com';
  const paginaSiguiente = 'https://www.nextPage.com';
  const paginaAnterior = 'https://www.previousPage.com';
  const mockCallbackPagina = jest.fn(() => {});

  mostrarPaginador(
    totalPokemones,
    paginaActual,
    paginaSiguiente,
    paginaAnterior,
    mockCallbackPagina,
  );

  const $paginador = document.querySelector('#paginador');
  expect($paginador.childElementCount - 2).toEqual(cantidadDePaginas);

  const $itemsDePaginador = $paginador.childNodes;
  $itemsDePaginador.forEach(($item, index) => {
    const esPrimerItem = index === 0;
    const esUltimoItem = index === $paginador.childElementCount - 1;
    if (esPrimerItem) {
      expect($item.textContent).toBe('Anterior');
    } else if (esUltimoItem) {
      expect($item.textContent).toBe('Siguiente');
    } else {
      expect(Number($item.textContent)).toBe(index);
    }
  });


  $paginador.click();
  expect(mockCallbackPagina).toBeCalledTimes(1);
});

test('manejar cambio de página con número', () => {
  const $link = document.createElement('a');
  $link.textContent = '2';
  $link.className = 'page-link';
  $link.href = '#';
  $link.dataset.pagina = '2';

  const mockEvent = { preventDefault: () => { }, target: $link };
  jest.spyOn(mockEvent, 'preventDefault');

  const mockCallbackPagina = jest.fn(() => { });
  manejarCambioPagina(mockEvent, mockCallbackPagina);

  expect(mockEvent.preventDefault).toBeCalledTimes(1);
  expect(mockCallbackPagina).toBeCalledWith(2);
});


test('manejar cambio de página sin número', () => {
  const $link = document.createElement('a');
  $link.textContent = 'Siguiente/Anterior';
  $link.className = 'page-link';
  $link.href = 'https://paginasiguienteoanterior.com';
  $link.dataset.pagina = 'Siguiente/Anterior';

  const mockEvent = { preventDefault: () => { }, target: $link };
  const mockCallbackPagina = jest.fn(() => { });

  jest.spyOn(mockEvent, 'preventDefault');

  manejarCambioPagina(mockEvent, mockCallbackPagina);

  expect(mockEvent.preventDefault).toBeCalledTimes(1);
  expect(mockCallbackPagina).toBeCalledWith('https://paginasiguienteoanterior.com');
});
