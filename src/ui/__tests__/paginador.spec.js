import mostrarPaginador from '../paginador.js';
import manejarCambioPagina from '../paginador.js';
import fixture from '../../__tests__/pokedex.fixture.js';

beforeEach(() => {
    document.body.innerHTML = fixture;
});

describe('Prueba mostrar paginador', () => {
    const mockCallback = jest.fn();
    test('Prueba la función', () => {
        mostrarPaginador(
            1118,
            2,
            'https://urlsiguiente.com',
            'https://urlanterior.com',
            mockCallback
        );

        let paginador = document.querySelector('#paginador');
        let totalItemsPaginador = paginador.querySelectorAll('li');
        let totalPaginas = Math.ceil(1118/20) + 2;
        expect(totalItemsPaginador).toHaveLength(totalPaginas);
    });

    test('Prueba cambio de página', () => {
        mostrarPaginador(
            1118,
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
            1118,
            1,
            'https://urlsiguiente.com',
            '',
            mockCallback
        );

        let anterior = document.querySelector('#paginador > li.page-item.disabled');
        expect(anterior.textContent).toEqual('Anterior');
        expect(anterior.classList).toContain('disabled');
    });

    test('Prueba que el botón siguiente no esté habilitado', () => {
        mostrarPaginador(
            1118,
            56,
            '',
            'https://urlanterior.com',
            mockCallback
        );

        let siguiente = document.querySelector("#paginador > li.page-item.disabled");
        expect(siguiente.textContent).toEqual('Siguiente');
        expect(siguiente.classList).toContain('disabled');
    });
});
