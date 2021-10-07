import {  manejarCambioPagina} from "../paginador";
import fixture from "./paginador.fixture"


document.body.innerHTML = fixture;
const mockCallback = jest.fn();

describe('Maneja el cambio de paǵina',()=>{
 document.querySelector("#paginador").onclick= (e)=>{
 manejarCambioPagina(e,mockCallback)
}
it('Maneja el cambio de pagina cuando hay un numero',()=>{
 document.querySelector("#paginador-a").click();
 expect(mockCallback).toHaveBeenCalledWith(31);
})
it('No ejecuta el cambio de pagina si no cumple las condiciones',()=>{
 document.querySelector("#paginador-b").click();
 expect(mockCallback).toHaveBeenLastCalledWith("");
})
})
