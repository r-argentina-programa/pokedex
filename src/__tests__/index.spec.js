import inicializar from '../pokedex.js';
import '../index.js';

jest.mock('../pokedex.js', () => jest.fn());

test('inicializa pokedex', () => {
  expect(inicializar)
    .toHaveBeenCalledTimes(1);
});
