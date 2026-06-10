// ========================================
// SECCIÓN FIRMAS
// Variables, funciones y eventos
// ========================================

// VARIABLES 
export const firmaTecnico = document.getElementById("firmaTecnico");
export const firmaCliente = document.getElementById("firmaRecibe");
export const eliminarFirmaTecnico = document.getElementById("eliminarFirmaTecnico");
export const eliminarFirmaCliente = document.getElementById("eliminarFirmaCliente");
export const guardarFirmaTecnico = document.getElementById("guardarFirmaTecnico");
export const guardarFirmaCliente = document.getElementById("guardarFirmaCliente");

// Contextos de canvas para dibujar
export const ctxTecnico = firmaTecnico.getContext("2d");
export const ctxCliente = firmaCliente.getContext("2d");

// Estados de dibujo
export let imagenTecnico;
export let dibujandoTecnico = false;
export let dibujandoCliente = false;

// Canvas vacio para validar si hay firma
export const lienzoVacio = firmaTecnico.toDataURL();

// ========================================
// FUNCIONES
// ========================================

// Función para empezar el trazo
export function EmpezarTrazo(valor, evento) {
    valor.beginPath();
    valor.moveTo(evento.offsetX, evento.offsetY);
}

// Función para mover el trazo
export function MoverTrazo(valor, evento) {
    valor.lineTo(evento.offsetX, evento.offsetY);
    valor.stroke();
    valor.strokeStyle = "red";
    valor.lineWidth = 3;
}

// Función para eliminar trazo
 export function eliminarTrazo(contexto, valor) {
    contexto.clearRect(0, 0, valor.width, valor.height);
}

// ========================================
// EVENTOS - FIRMA TÉCNICO
// ========================================

firmaTecnico.addEventListener("mousedown", function(e) {
    dibujandoTecnico = true;
    EmpezarTrazo(ctxTecnico, e);
});

firmaTecnico.addEventListener("mousemove", function(e) {
    if (dibujandoTecnico === true) {
        MoverTrazo(ctxTecnico, e);
    }
});

firmaTecnico.addEventListener("mouseup", function(e) {
    dibujandoTecnico = false;
    console.log("Terminando de dibujar en la firma del técnico");
});

// ========================================
// EVENTOS - FIRMA CLIENTE
// ========================================

firmaCliente.addEventListener("mousedown", function(e) {
    dibujandoCliente = true;
    EmpezarTrazo(ctxCliente, e);
});

firmaCliente.addEventListener("mousemove", function(e) {
    if (dibujandoCliente === true) {
        MoverTrazo(ctxCliente, e);
    }
});

firmaCliente.addEventListener("mouseup", function(e) {
    dibujandoCliente = false;
    console.log("Terminando de dibujar en la firma del cliente");
});

// ========================================
// EVENTOS - ELIMINAR FIRMAS CON BOTÓN
// ========================================

eliminarFirmaCliente.addEventListener("click", function() {
    eliminarTrazo(ctxCliente, firmaCliente);
});

eliminarFirmaTecnico.addEventListener("click", function() {
    eliminarTrazo(ctxTecnico, firmaTecnico);
});
