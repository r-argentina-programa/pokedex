import { mostrarListadoPokemones } from '../listado.js';

const nombresPokemones = ['picachu', 'ratata'];
const mockCallBack = jest.fn();

test('prueba llamar al callback', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  mostrarListadoPokemones(nombresPokemones, mockCallBack);
  document.querySelectorAll('.list-group-item').forEach((elem) => {
    elem.click();
  });
  expect(mockCallBack).toHaveBeenCalledTimes(2);
});
