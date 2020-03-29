import { BASE_URL, cargarPokemon, cargarPokemones, LIMITE_POKEMONES } from '../pokemon.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('carga 1 pokemon', () => {
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
      r({});
    });
    resolve({ json: () => jsonPromise });
  }));

  cargarPokemon('bulbasaur');
  expect(global.fetch)
    .toHaveBeenCalledTimes(1);

  expect(global.fetch)
    .toHaveBeenCalledWith(`${BASE_URL}bulbasaur`);
});

test('cargar 1 pokemon sin identificador da error', () => {
  expect(cargarPokemon())
    .rejects
    .toEqual(new Error('Se necesita un identificador para cargar un pokemón'));

  expect(global.fetch)
    .toHaveBeenCalledTimes(0);
});

test('carga listado de pokemones con parametros por default', () => {
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
      r([]);
    });
    resolve({ json: () => jsonPromise });
  }));

  cargarPokemones();

  expect(global.fetch)
    .toHaveBeenCalledTimes(1);
  expect(global.fetch)
    .toHaveBeenCalledWith(`${BASE_URL}?offset=0&limit=${LIMITE_POKEMONES}`);
});


test('carga listado de pokemones con parametros definidos por el usuario', () => {
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
      r([]);
    });
    resolve({ json: () => jsonPromise });
  }));

  cargarPokemones(1, 15);

  expect(global.fetch)
    .toHaveBeenCalledTimes(1);
  expect(global.fetch)
    .toHaveBeenCalledWith(`${BASE_URL}?offset=1&limit=${15}`);
});
