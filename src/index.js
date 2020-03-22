function actualizarTextoAyuda(texto) {
  const $ayuda = document.querySelector('#ayuda');
  $ayuda.textContent = texto;
}

function mostrarTipos(tipos) {
  const $tipos = document.querySelector('#tipos');
  $tipos.innerHTML = '';

  tipos.forEach((tipo) => {
    const $tipo = document.createElement('span');
    $tipo.className = `badge ${tipo} type`;
    $tipo.textContent = tipo;
    $tipos.appendChild($tipo);
  });
}

function mostrarMovimientos(movimientos) {
  const $movimientos = document.querySelector('#movimientos');

  movimientos.forEach((movimiento) => {
    const { movimiento: nombreMovimiento, versiones } = movimiento;
    const $movimientoFila = document.createElement('tr');
    const $movimiento = document.createElement('th');
    $movimiento.setAttribute('scope', 'row');
    $movimiento.textContent = nombreMovimiento;
    $movimientoFila.appendChild($movimiento);

    const $versiones = document.createElement('td');

    versiones.forEach((version) => {
      const $version = document.createElement('span');
      $version.className = 'badge';
      $version.textContent = version;
      $versiones.appendChild($version);
    });

    $movimientoFila.appendChild($versiones);
    $movimientos.appendChild($movimientoFila);
  });
}

function mostrarHabilidades(habilidades) {
  const $habilidades = document.querySelector('#habilidades');
  $habilidades.innerHTML = '';
  habilidades.forEach((habilidad) => {
    const $habilidad = document.createElement('span');
    $habilidad.className = 'badge';
    $habilidad.textContent = habilidad;

    $habilidades.appendChild($habilidad);
  });
}

function mostrarPokemon(pokemon) {
  const {
    id,
    name: nombre,
    sprites: { front_default: fotoPrincipal },
    types: tipos,
    abilities: habilidades,
    moves: movimientos,
  } = pokemon;

  document.querySelector('#pokemon-contenedor').style.display = 'block';
  actualizarTextoAyuda('');

  const $imagen = document.querySelector('#pokemon-imagen');
  $imagen.setAttribute('src', fotoPrincipal);
  $imagen.setAttribute('alt', `Imagen frontal del pokemon ${nombre}`);

  document.querySelector('#pokemon-nombre').textContent = nombre;
  document.querySelector('#pokemon-id').textContent = id;

  mostrarTipos(tipos.map((item) => item.type.name));
  mostrarHabilidades(habilidades.map((item) => item.ability.name));
  mostrarMovimientos(movimientos.map((item) => ({
    movimiento: item.move.name,
    versiones: item.version_group_details.map((v) => v.version_group.name),
  })));
}

function obtenerParametrosDeURL(url) {
  let offset;
  let limit;
  try {
    offset = /offset=([0-9]+)/gi.exec(url).pop();
    limit = /limit=([0-9]+)/gi.exec(url).pop();
  } catch (e) {
    offset = undefined;
    limit = undefined;
  }
  return { offset, limit };
}

function cargarPokemon(nombre) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then((r) => r.json()).then((pokemon) => {
    console.log(pokemon);
    mostrarPokemon(pokemon);
  });
}

function cargarPokemones(offset = 0, limit = 20) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`).then((r) => r.json());
}

function mostrarTotalPokemones(totalPokemones) {
  document.querySelector('#total-pokemones').textContent = totalPokemones;
}

function actualizarTextoIndicePokemones(texto) {
  const $indice = document.querySelector('#indice');
  $indice.textContent = texto;
}

function mostrarListadoPokemones(pokemones) {
  const $indice = document.querySelector('#indice');
  $indice.innerHTML = '';

  pokemones.forEach((pokemon) => {
    const { name: nombre } = pokemon;
    const $link = document.createElement('a');
    $link.className = 'list-group-item list-group-item-action';
    $link.setAttribute('href', '#');
    $link.textContent = nombre;
    $link.addEventListener('click', () => {
      actualizarTextoAyuda('Cargando...');
      cargarPokemon(nombre);
    });
    $indice.appendChild($link);
  });
}

function crearItemPaginador(texto, url = '#') {
  const $item = document.createElement('li');
  const $link = document.createElement('a');
  $item.className = 'page-item';
  $link.className = 'page-link';
  $link.textContent = texto;
  $link.href = url;
  $link.dataset.pagina = texto;

  $item.appendChild($link);

  return $item;
}

function manejarCambioPagina(e) {
  e.preventDefault();
  const { target } = e;
  const href = target.getAttribute('href');
  let numeroPagina;
  const { pagina } = target.dataset;
  if (href === '#') {
    numeroPagina = Number(pagina);
    // eslint-disable-next-line no-use-before-define
    cambiarPagina(numeroPagina);
  } else {
    // eslint-disable-next-line no-use-before-define
    cambiarPagina(href);
  }
}

function mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior) {
  const POKEMONES_POR_PAGINA = 20;
  const $paginador = document.querySelector('#paginador');
  $paginador.innerHTML = '';

  const totalPaginas = Math.ceil(totalPokemones / POKEMONES_POR_PAGINA);

  const $paginaAnterior = crearItemPaginador('Anterior', urlAnterior);

  if (urlAnterior) {
    $paginaAnterior.classList.remove('disabled');
  } else {
    $paginaAnterior.classList.add('disabled');
  }
  $paginador.appendChild($paginaAnterior);

  for (let i = 0; i < totalPaginas; i += 1) {
    const numeroPagina = i + 1;
    const $pagina = crearItemPaginador(numeroPagina);
    if (i === (paginaActual - 1)) {
      $pagina.classList.add('active');
    }
    $paginador.appendChild($pagina);
  }

  const $paginaSiguiente = crearItemPaginador('Siguiente', urlSiguiente);
  if (urlSiguiente) {
    $paginaSiguiente.classList.remove('disabled');
  } else {
    $paginaSiguiente.classList.add('disabled');
  }
  $paginador.appendChild($paginaSiguiente);

  $paginador.addEventListener('click', manejarCambioPagina);
}

function cambiarPagina(pagina) {
  const POKEMONES_POR_PAGINA = 20;
  let paginaActual;
  let offset;
  let limit = POKEMONES_POR_PAGINA;

  if (typeof pagina === 'number') {
    offset = POKEMONES_POR_PAGINA * (pagina - 1);
    paginaActual = pagina;
  } else {
    const parametros = obtenerParametrosDeURL(pagina);
    offset = parametros.offset;
    limit = parametros.limit;
    paginaActual = Math.ceil(parametros.offset / parametros.limit) + 1;
  }

  actualizarTextoIndicePokemones('Cargando...');

  return cargarPokemones(offset, limit).then((respuesta) => {
    const {
      count: totalPokemones, results: pokemones, next: urlSiguiente, previous: urlAnterior,
    } = respuesta;
    mostrarTotalPokemones(totalPokemones);
    mostrarListadoPokemones(pokemones);
    mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, manejarCambioPagina);
  });
}

function iniciar() {
  cambiarPagina(1);
}


iniciar();
