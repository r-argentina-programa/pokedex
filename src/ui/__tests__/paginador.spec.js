import mostrarPaginador from '../paginador.js';
import fixture from '../../__tests__/pokedex.fixture.js';

beforeEach(() => {
    document.body.innerHTML = fixture;
});

describe('Prueba mostrar paginador', () => {
    const mockCallback = jest.fn();
    const TOTAL_POKEMONES = 1118;
    const POKEMONES_POR_PAGINA = 20;
    const SUMA_SIGUIENTE_ANTERIOR = 2;

    test('Prueba la función', () => {
        mostrarPaginador(
            TOTAL_POKEMONES,
            2,
            'https://urlsiguiente.com',
            'https://urlanterior.com',
            mockCallback
        );

        const paginador = document.querySelector('#paginador');
        const totalItemsPaginador = paginador.querySelectorAll('li');
        const totalPaginas = Math.ceil(TOTAL_POKEMONES/ POKEMONES_POR_PAGINA) + SUMA_SIGUIENTE_ANTERIOR;
        expect(totalItemsPaginador).toHaveLength(totalPaginas);
    });

    test('Prueba cambio de página', () => {
        mostrarPaginador(
            TOTAL_POKEMONES,
            2,
            'https://urlsiguiente.com',
            'https://urlanterior.com',
            mockCallback
        );

        let pagina = document.querySelector("#paginador > li:nth-child(5) > a");
        pagina.click();
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('Prueba que el botón anterior no esté habilitado', () => {
        mostrarPaginador(
            TOTAL_POKEMONES,
            1,
            'https://urlsiguiente.com',
            '',
            mockCallback
        );

        const anterior = document.querySelector('#paginador > li.page-item.disabled')
        expect(anterior.classList.contains('disabled')).toBe(true);
    });

    test('Prueba que el botón siguiente no esté habilitado', () => {
        mostrarPaginador(
            TOTAL_POKEMONES,
            56,
            '',
            'https://urlanterior.com',
            mockCallback
        );

        const siguiente =  document.querySelector("#paginador > li.page-item.disabled");
        expect(siguiente.classList.contains('disabled')).toBe(true);
    });
});
