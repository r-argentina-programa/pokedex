// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import obtenerParametrosDeURL from '../utilidades.js';

describe('utilidades', () => {
  it('deberia obtener los parametros de la url', () => {
    expect(obtenerParametrosDeURL('http://asd.com?offset=1&limit=1'))
      .toEqual({
        offset: '1',
        limit: '1',
      });
  });

  it('deberia obtener los parametros por default de la url', () => {
    expect(obtenerParametrosDeURL('http://asd.com/'))
      .toEqual({
        offset: undefined,
        limit: undefined,
      });
  });

  it('deberia obtener los parametros en cualquier orden', () => {
    expect(obtenerParametrosDeURL('http://asd.com/?limit=2&offset=2'))
      .toEqual({
        offset: '2',
        limit: '2',
      });
  });
});
