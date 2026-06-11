// ========================================
// VARIABLES GENERALES
// ========================================

export const tipoServicio = document.getElementById("tipoServicio");
export const fuenteEnergia = document.getElementById("fuenteEnergia");
export const tipoRueda = document.getElementById("tipoRueda");
export const tipoDeCombustible = document.getElementById("tipoDeCombustible");

// Secciones principales
export const SeccionEntrega = document.getElementById("entrega");
export const SeccionPreventivo = document.getElementById("preventivo");
export const SeccionCorrectivo = document.getElementById("correctivo");
export const SeccionRetiro = document.getElementById("retiro");
export const SeccionDiagnostico = document.getElementById("diagnostico");

// Preguntas condicionales
export const PreguntasCombustion = document.getElementById("PreguntasCombustion");
export const PreguntasElectricas = document.getElementById("preguntasElectricas");
export const RuedasMacizas = document.getElementById("preguntasRuedasMacizas");
export const RuedasNeumaticas = document.getElementById("preguntasRuedasNeumaticas");
export const MontacargaCombustionGas = document.getElementById("CombustionGas");
export const MontacargaCombustionGasolina = document.getElementById("CombustionGasolina");
export const MontacargaCombustionDual = document.getElementById("CombustionDual");
export const MontacargaCombustionDiesel = document.getElementById("CombustionDiesel");
export const FiltroCombustibleDiesel = document.getElementById("RefeFiltroCombustibleDiesel");
export const FiltroCombustible = document.getElementById("RefeFiltroCombustible");

// Exponer como variables globales para compatibilidad con scripts clásicos
Object.assign(window, {
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
});

// ========================================
// EVENTOS DE FILTRADO Y VISIBILIDAD
// ========================================

// Ocultar o mostrar secciones dependiendo del tipo de servicio seleccionado
tipoServicio.addEventListener("change", function() {
    SeccionEntrega.style.display = "none";
    SeccionPreventivo.style.display = "none";
    SeccionCorrectivo.style.display = "none";
    SeccionRetiro.style.display = "none";
    SeccionDiagnostico.style.display = "none";

    if (tipoServicio.value === "1") {
        SeccionCorrectivo.style.display = "block";
        tipoServicio.style.display = "none";
    } else if (tipoServicio.value === "2") {
        SeccionPreventivo.style.display = "block";
        tipoServicio.style.display = "none";
    } else if (tipoServicio.value === "3") {
        SeccionDiagnostico.style.display = "block";
        tipoServicio.style.display = "none";
    } else if (tipoServicio.value === "4") {
        SeccionEntrega.style.display = "block";
        tipoServicio.style.display = "none";
    } else if (tipoServicio.value === "5") {
        SeccionRetiro.style.display = "block";
        tipoServicio.style.display = "none";
    }
});

// Ocultar o mostrar secciones dependiendo la respuesta de tipo de energia
fuenteEnergia.addEventListener("change", function() {
    PreguntasCombustion.style.display = "none";
    PreguntasElectricas.style.display = "none";

    if (fuenteEnergia.value === "1") {
        PreguntasElectricas.style.display = "block";
    } else if (fuenteEnergia.value === "2") {
        PreguntasCombustion.style.display = "block";
    }
});

//Ocultar o mostrar secciones dependiendo el tipo de combustion 
tipoDeCombustible.addEventListener("change", function(){
    MontacargaCombustionGas.style.display = "none";
    MontacargaCombustionGasolina.style.display = "none";
    MontacargaCombustionDual.style.display = "none";
    MontacargaCombustionDiesel.style.display = "none";

    if(tipoDeCombustible.value === "1"){
        MontacargaCombustionGasolina.style.display = "block";
    }else if(tipoDeCombustible.value === "2"){
        MontacargaCombustionDiesel.style.display = "block";
        RefeFiltroCombustibleDiesel.disabled = false;
        RefeFiltroCombustible.disabled = true;

    }else if(tipoDeCombustible.value === "3") {
        MontacargaCombustionGas.style.display="block";
    }else if(tipoDeCombustible.value === "4") {
        MontacargaCombustionDual.style.display="block";
    }
})

// Ocultar o mostrar preguntas dependiendo el tipo de rueda
tipoRueda.addEventListener("change", function() {
    RuedasMacizas.style.display = "none";
    RuedasNeumaticas.style.display = "none";

    if (tipoRueda.value === "1") {
        RuedasNeumaticas.style.display = "block";
    } else if (tipoRueda.value === "2") {
        RuedasMacizas.style.display = "block";
    }
});
