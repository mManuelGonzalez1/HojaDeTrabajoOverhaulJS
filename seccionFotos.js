// ========================================
// SECCIÓN FOTOS
// Variables, funciones y eventos
// ========================================


// VARIABLES
 export const configuracionFotos = [
    { input: fotoMontacarga, contenedor: contenedorFotosMontacarga },
    { input: fotoCargador, contenedor: contenedorFotosCargador },
    { input: fotoBateria, contenedor: contenedorFotosBateria },
    { input: fotoMontacargaRetiro, contenedor: contenedorFotosMontacargaRetiro },
    { input: fotoCargadorRetiro, contenedor: contenedorFotosCargadorRetiro },
    { input: fotoBateriaRetiro, contenedor: contenedorFotosBateriaRetiro },
    { input: fotoRepuestosPreventivo, contenedor: contenedorFotosRepuestosPreventivos },
    { input: fotoRepuestosCorrectivo, contenedor: contenedorFotosRepuestosCorrectivo }
];


// Arrays para almacenar fotos en base64
let fotosMontacargaBase64 = []; // Array para guardar las fotos del montacarga en base 64
let fotosBateriaBase64 = []; // Array para guardar las fotos de bateria en base 64
let fotosCargadorBase64 = []; // Array para guardar las fotos del cargador en base 64

// ========================================
// FUNCIONES
// ========================================

// Función para empaquetar vista previa de fotos
export function procesarFotos(ContenedorFotos, InputFoto) {
    // 1. Limpiamos el contenedor antes de empezar, esto con el fin de que si 
    // hay mas fotos, no se acumulen en el contenedor, 
    // sino que se reemplacen por las nuevas fotos seleccionadas
    ContenedorFotos.innerHTML = "";
    
    // Creamos el for para que itere en todas las fotos
    for (let foto of InputFoto.files) {
        // 2. Creamos un nuevo elemento de imagen para cada foto seleccionada, 
        // y le asignamos la URL de la foto utilizando URL
        const nuevaFoto = document.createElement("img");
        nuevaFoto.src = URL.createObjectURL(foto);
        
        // 3. Estilizamos las fotos para que se vean bien en el contenedor
        nuevaFoto.style.width = "200px";
        nuevaFoto.style.height = "200px";
        nuevaFoto.style.objectFit = "cover";
        nuevaFoto.style.margin = "10px";
        nuevaFoto.style.justifyContent = "center";
        
        // 4. Agregamos la nueva foto al contenedor
        ContenedorFotos.appendChild(nuevaFoto);
    }
}

// ========================================
// EVENTOS
// ========================================

// Evento para mostrar la foto dependiendo del modelo seleccionado
for (let par of configuracionFotos) {
    par.input.addEventListener("change", function() {
        procesarFotos(par.contenedor, par.input);
    });
}
