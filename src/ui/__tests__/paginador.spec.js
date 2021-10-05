import manejarCambioPagina from "../paginador.js"
import paginadorFixture from "./paginador.fixture.js"

describe('Maneja el cambio de pagina',()=>{
it('Maneja el cambio de página', () => {
    document.body.innerHTML = paginadorFixture;

    const mockCallback = jest.fn();

    const $paginador = document.querySelector('#paginador');
    // $paginador.onclick = (e)=>{
    //     manejarCambioPagina(e, mockCallback);
    // }
    
    $paginador.onclick = e => {manejarCambioPagina(e,mockCallback)};
    document.querySelector('#paginador-a').click();
    expect(mockCallback).toHaveBeenCalledTimes(1);
})
})