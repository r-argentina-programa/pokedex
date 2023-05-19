// Testear manejar cambio de pagina y mostrar paginador
import mostrarPaginador from '../paginador.js';

test('muestra paginador', () => {
  document.body.innerHTML = '<div id="paginador"></div>';

  const totalPokemones = 1000;
  const pokemonesPorPagina = 20;
  const cantidadDePaginas = Math.ceil(totalPokemones / pokemonesPorPagina);
  const paginaActual = 'https://www.pageactual.com';
  const paginaSiguiente = 'https://www.nextPage.com';
  const paginaAnterior = 'https://www.p1reviousPage.com';

  mostrarPaginador(
    totalPokemones,
    paginaActual,
    paginaSiguiente,
    paginaAnterior,
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
});
