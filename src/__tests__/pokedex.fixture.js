export default `<div class="container">
    <div class="row">
        <p>Hay <strong id="total-pokemones">...</strong> pokemones en la pokedex</p>
    </div>
    <div class="container">
        <nav aria-label="Page navigation example">
            <ul class="pagination flex-wrap" id="paginador">
                <!-- -->
            </ul>
        </nav>
    </div>
    <div class="row">
        <div class="col-4">
            <div class="list-group" id="indice">
                <p>Cargando...</p>
                <!-- -->
            </div>
        </div>
        <div class="col" id="pokemon">

            <p id="ayuda">Seleccioná un pokemon para ver su información</p>

            <div class="card" id="pokemon-contenedor">

                <div class="card-body">
                    <h5 class="card-title"><strong id="pokemon-nombre">...</strong> (<strong
                            id="pokemon-id">...</strong>)</h5>

                    <img class="card-img" id="pokemon-imagen" src="" alt="Imagen de pokemon"/>

                    <div id="tipos-contenedor">
                        <strong>Tipos</strong>
                        <div id="tipos">
                            <!-- -->
                        </div>
                    </div>

                    <div id="habilidades-contenedor">
                        <strong>Habilidades</strong>
                        <div id="habilidades">
                            <!-- -->
                        </div>
                    </div>

                    <div id="movimientos-contendor">
                        <strong>Movimientos</strong>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Movimiento</th>
                                <th scope="col">Versiones</th>
                            </tr>
                            </thead>
                            <tbody id="movimientos">
                            <!-- -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
