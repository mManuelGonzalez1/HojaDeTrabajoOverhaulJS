// ========================================
// SECCIÓN INSUMOS
// Variables y eventos
// ========================================

// VARIABLES
export const tablaInsumosPreventivo = document.getElementById("tablaInsumosPreventivo");
export const botonAñadir = document.getElementById("agregarInsumo");
export const filaInsumo = document.getElementsByClassName("fila-insumo");

// ========================================
// EVENTOS
// ========================================

// Evento para botón de agregar Insumos
botonAñadir.addEventListener("click", function() {
    tablaInsumosPreventivo.insertAdjacentHTML("beforeend", `
        <tr class="fila-insumo">
            <td>
                <select name="insumo" class="insumo">
                    <option value="0" disabled selected>Selecciona un insumo</option>
                    <option value="1">Desengrasante</option>
                    <option value="2">Agua de bateria</option>
                    <option value="3">Silicona</option>
                    <option value="4">Bolsa de trapos</option>
                </select>
            </td>
            <td>
                <input type="number" class="cantidad" value="2" min="0" max="20">
            </td>
            <td>
                <select name="medida" class="Medidainsumo">
                    <option value="0" disabled selected>Selecciona una medida</option>
                    <option value="litros" name="Litros">Litros</option>
                    <option value="bolsa" name="bolsa">Bolsa</option>
                </select>
            </td>
        </tr>
    `);
});
