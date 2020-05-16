import { cargarPokemon, cargarPokemones } from './servicios/pokemon.js';
import { actualizarTextoAyuda, mostrarTotalPokemones } from './ui/general.js';
import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from './ui/listado.js';
import mostrarPaginador from './ui/paginador.js';
import mostrarPokemon from './ui/pokemon.js';
import obtenerParametrosDeURL from './utilidades/utilidades.js';

async function cambiarPagina(pagina) {
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

  const listadoPokemones = await cargarPokemones(offset, limit);

  mostrarTotalPokemones(listadoPokemones.total);
  mostrarListadoPokemones(listadoPokemones.nombresPokemones, async (nombre) => {
    actualizarTextoAyuda('Cargando...');
    mostrarPokemon(await cargarPokemon(nombre));
  });

  mostrarPaginador(
    listadoPokemones.total,
    paginaActual,
    listadoPokemones.siguienteUrl,
    listadoPokemones.anteriorUrl,
    cambiarPagina,
  );
}

export default function inicializar() {
  return cambiarPagina(1)
    .catch((e) => console.error(e));
}
