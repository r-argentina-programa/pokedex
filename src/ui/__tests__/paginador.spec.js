import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';

describe('manejarCambioPagina', () => {
  let callbackPaginaSeleccionada;
  let event;

  beforeEach(() => {
    callbackPaginaSeleccionada = jest.fn();
    event = { target: null, preventDefault: jest.fn() };
  });


  it('debe prevenir el comportamiento por defecto del evento', () => {
    const $link = document.createElement('a');
    $link.setAttribute('href', '#');

    event.target = $link;

    manejarCambioPagina(event, callbackPaginaSeleccionada);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('debe llamar al callback con el número de página correspondiente si el href es "#" y el número de página está en el dataset del elemento', () => {
    const $link = document.createElement('a');
    $link.setAttribute('href', '#');
    $link.setAttribute('data-pagina', '3');

    event.target = $link;

    manejarCambioPagina(event, callbackPaginaSeleccionada);
    expect(callbackPaginaSeleccionada).toHaveBeenCalledWith(3);
  });

  it('debe llamar al callback con el valor del href si el href es distinto de "#"', () => {
    const $link = document.createElement('a');
    $link.setAttribute('href', '/pagina/3');

    event.target = $link;

    manejarCambioPagina(event, callbackPaginaSeleccionada);
    expect(callbackPaginaSeleccionada).toHaveBeenCalledWith('/pagina/3');
  });
});

describe('mostrarPaginador', () => {
  let $paginador;

  beforeEach(() => {
    document.body.innerHTML = '<div id="paginador"></div>';
    $paginador = document.querySelector('#paginador');
  });

  it('debe crear el elemento "Anterior" con href correspondiente', () => {
    mostrarPaginador(50, 2, '/siguiente', '/anterior');
    const $anterior = $paginador.querySelector('.page-item:first-child a');
    expect($anterior.getAttribute('href')).toBe('/anterior');
  });

  it('debe crear el elemento "Siguiente" con href correspondiente', () => {
    mostrarPaginador(50, 2, '/siguiente', '/anterior');
    const $siguiente = $paginador.querySelector('.page-item:last-child a');
    expect($siguiente.getAttribute('href')).toBe('/siguiente');
  });

  it('debe crear los elementos de paginación correspondientes', () => {
    mostrarPaginador(50, 1, '/siguiente', '/anterior');
    const $paginas = $paginador.querySelectorAll('.page-item:not(:first-child):not(:last-child) a');
    expect($paginas.length).toBe(3);
    expect($paginas[0].textContent).toBe('1');
    expect($paginas[1].textContent).toBe('2');
    expect($paginas[2].textContent).toBe('3');
  });

  it('debe agregar la clase "active" al elemento de paginación correspondiente a la página actual', () => {
    mostrarPaginador(50, 2, '/siguiente', '/anterior');
    const $paginas = $paginador.querySelectorAll('.page-item:not(:first-child):not(:last-child)');
    expect($paginas[1].classList.contains('active')).toBe(true);
  });

  it('los elementos de paginación que no son la página actual no deben tener la clase "active"', () => {
    mostrarPaginador(50, 2, '/siguiente', '/anterior');
    const $paginas = $paginador.querySelectorAll('.page-item:not(:first-child):not(:last-child)');
    expect($paginas[0].classList.contains('active')).toBe(false);
    expect($paginas[2].classList.contains('active')).toBe(false);
  });

  it('debe agregar la clase "disabled" al elemento "Anterior" si no hay href a urlAnterior', () => {
    mostrarPaginador(50, 2, '/siguiente', null);
    const $anterior = $paginador.querySelector('.page-item:first-child');
    expect($anterior.classList.contains('disabled')).toBe(true);
  });

  it('debe agregar la clase "disabled" al elemento "Siguiente" si no hay href a urlSiguiente', () => {
    mostrarPaginador(50, 2, null, '/anterior');
    const $siguiente = $paginador.querySelector('.page-item:last-child');
    expect($siguiente.classList.contains('disabled')).toBe(true);
  });
});
