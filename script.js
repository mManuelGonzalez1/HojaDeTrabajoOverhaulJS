
// ========================================
// SCRIPT PRINCIPAL
// ========================================

import {
    tipoServicio,
    fuenteEnergia,
    tipoRueda,
    SeccionEntrega,
    SeccionPreventivo,
    SeccionCorrectivo,
    SeccionRetiro,
    SeccionDiagnostico,
    PreguntasCombustion,
    PreguntasElectricas,
    RuedasMacizas,
    RuedasNeumaticas
} from './variablesGenerales.js';

import {configuracionFotos,procesarFotos} from './seccionFotos.js';
import {firmaTecnico,
firmaCliente, 
eliminarFirmaTecnico, 
eliminarFirmaCliente, 
ctxTecnico, 
ctxCliente, 
imagenTecnico, 
dibujandoTecnico, 
dibujandoCliente,
lienzoVacio,
EmpezarTrazo,
MoverTrazo,
eliminarTrazo
} from './seccionFirmas.js';

import { tablaInsumosPreventivo, botonAñadir, filaInsumo } from './seccionInsumos.js';

const botonEnviarFormulario = document.getElementById("btnEnviar");

// ========================================
// EVENTO PRINCIPAL - ENVIAR FORMULARIO
// ========================================

botonEnviarFormulario.addEventListener("click", function() {
    // Recolectar imagenes de firmas del cliente
    const firmaActual = firmaCliente.toDataURL();
    if (firmaActual === lienzoVacio) {
        alert("FIRMA EL DOCUMENTO POR FAVOR");
    } else {
        alert("FIRMA GUARDADA");
        console.log(firmaActual);
    }

    // Recolectar la información de las imágenes del montacarga, bateria y cargador
    console.log(enviarFotosEntregaServidor(fotoMontacarga, fotosMontacargaBase64));
    console.log(enviarFotosEntregaServidor(fotoBateria, fotosBateriaBase64));
    console.log(enviarFotosEntregaServidor(fotoCargador, fotosCargadorBase64));
});
