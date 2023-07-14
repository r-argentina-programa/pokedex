import mostrarPokemon, { mostrarHabilidades, mostrarMovimientos, mostrarTipos } from "../pokemon.js";

beforeEach(() => {
  document.body.innerHTML = `
      <div id="pokemon-contenedor" style="display: none;"></div>
      <img id="pokemon-imagen" src="" alt="">
      <div id="pokemon-nombre"></div>
      <div id="pokemon-id"></div>
      <div id="tipos"></div>
      <div id="habilidades"></div>
      <div id="movimientos"></div>
    `;
});

let actualizarTextoAyudaLlamada = false;

jest.mock("../general", () => ({
  actualizarTextoAyuda: jest.fn().mockImplementation(() => {
    actualizarTextoAyudaLlamada = true;
  }),
}));

test("muestra la informacion del Pokemon en el DOM", () => {
  const mockCharizard = {
    id: 6,
    nombre: "charizard",
    foto: "http://charizard.jpg/",
    tipos: ["fuego", "volador"],
    habilidades: ["blaze", "poder-solar"],
    movimientos: [
      {
        movimiento: "lanzallamas",
        versiones: ["rojo-azul", "amarillo"],
      },
      {
        movimiento: "colmillo-igneo",
        versiones: ["blanco-negro", "x-y"],
      },
    ],
  };

  mostrarPokemon(mockCharizard);

  expect(actualizarTextoAyudaLlamada).toBe(true);
  actualizarTextoAyudaLlamada = false;

  const $contenedor = document.querySelector("#pokemon-contenedor");
  expect($contenedor.style.display).toBe("block");

  const $imagen = document.querySelector("#pokemon-imagen");
  expect($imagen.getAttribute("src")).toBe(mockCharizard.foto);
  expect($imagen.getAttribute("alt")).toBe(
    `Imagen frontal del pokemon ${mockCharizard.nombre}`
  );

  const $nombre = document.querySelector("#pokemon-nombre");
  expect($nombre.textContent).toBe(mockCharizard.nombre);

  const $id = document.querySelector("#pokemon-id");
  expect($id.textContent).toBe(mockCharizard.id.toString());

  const $tipos = document.querySelector("#tipos");
  expect($tipos.children.length).toBe(mockCharizard.tipos.length);

  const $habilidades = document.querySelector("#habilidades");
  expect($habilidades.children.length).toBe(mockCharizard.habilidades.length);

  const $movimientos = document.querySelector("#movimientos");
  expect($movimientos.children.length).toBe(mockCharizard.movimientos.length);
});

test("muestra los tipos con la funcion mostrarTipos()", () => {
  document.body.innerHTML = '<div id="tipos"></div>';
  const tipos = ["Agua", "Fuego", "Planta"];

  mostrarTipos(tipos);

  const $tipos = document.querySelector("#tipos");
  expect($tipos.children).toHaveLength(tipos.length);
});

test("muestra las habilidades con la funcion mostrarHabilides()", () => {
  document.body.innerHTML = '<div id="habilidades"></div>';
  const habilidades = ["Torrente", "Mar Llamas", "Espesura"];

  mostrarHabilidades(habilidades);

  const $habilidades = document.querySelector("#habilidades");
  expect($habilidades.children).toHaveLength(habilidades.length);
});

test("muestra los movimientos con la funcion mostrarMovimientos()", () => {
  const movimientos = [
    { movimiento: "lanzallamas", versiones: ["rojo", "amarillo"] },
    { movimiento: "cuchillada-slash", versiones: ["blanco-negro", "x-y"] },
  ];

  document.body.innerHTML = `
      <table>
        <tbody id="movimientos"></tbody>
      </table>
    `;
  const $movimientos = document.querySelector("#movimientos");

  mostrarMovimientos(movimientos);

  const $filasMovimientos = $movimientos.querySelectorAll("tr");
  expect($filasMovimientos.length).toBe(movimientos.length);
  const $primerMovimiento = $filasMovimientos[0].querySelector("th");
  expect($primerMovimiento.textContent).toBe(movimientos[0].movimiento);

  const $primerasVersiones = $filasMovimientos[0]
    .querySelector("td")
    .querySelectorAll("span");
  expect($primerasVersiones.length).toBe(movimientos[0].versiones.length);
  expect($primerasVersiones[0].textContent).toBe(movimientos[0].versiones[0]);
  expect($primerasVersiones[1].textContent).toBe(movimientos[0].versiones[1]);

  document.body.innerHTML = "";
});
