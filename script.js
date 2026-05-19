//Definicion de variables
const tipoServicio = document.getElementById("tipoServicio");
const SeccionEntrega= document.getElementById("entrega");
const SeccionPreventivo = document.getElementById("preventivo");
const fotoMontacarga = document.getElementById("fotoMontacarga");
const contenedorFotosMontacarga = document.getElementById("contenedorFotosMontacarga");
const firmaTecnico = document.getElementById("firmaTecnico");
const firmaCliente = document.getElementById("firmaRecibe");
//Funcion para ocultar o mostrar secciones dependiendo del tipo de servicio seleccionado
tipoServicio.addEventListener("change",function hola(){
    SeccionEntrega.style.display = "none";
    SeccionPreventivo.style.display = "none";

    if(tipoServicio.value === "4"){
        SeccionEntrega.style.display = "block";
        
    }else if(tipoServicio.value === "2"){
        SeccionPreventivo.style.display = "block";

    }

})

//Funcion para mostrar la foto de la montacarga dependiendo del modelo seleccionado
fotoMontacarga.addEventListener("change", function mostrarFoto(){
    // 1. Limpiamos el contenedor antes de empezar,esto con el fin de que si 
    //hay mas fotos, no se acumulen en el contenedor, sino que se reemplacen por las nuevas fotos seleccionadas
    contenedorFotosMontacarga.innerHTML = "";
    for(let foto of fotoMontacarga.files){
        // 2. Creamos un nuevo elemento de imagen para cada foto seleccionada, y le asignamos la URL de la foto utilizando
        //  URL.createObjectURL, esto nos permite mostrar la foto sin necesidad de subirla a un servidor.
       const nuevaFoto= document.createElement("img");
       nuevaFoto.src = URL.createObjectURL(foto);
       //3.Estilizamos las fotos para que se vena bien en el contendor,
         nuevaFoto.style.width = "200px";
         nuevaFoto.style.height = "200px";
         nuevaFoto.style.objectFit = "cover";
         nuevaFoto.style.margin = "10px";
         nuevaFoto.style.justifyContent = "center";
        //4. Agregamos la nueva foto al contenedor de fotos de montacarga
         contenedorFotosMontacarga.appendChild(nuevaFoto);
    }
})

const ctxTecnico = firmaTecnico.getContext("2d");
let dibujandoTecnico = false;
const ctxCliente = firmaCliente.getContext("2d");
let dibujandoCliente = false;
//Funcion para evitar tanto codigo 
function EmpezarTrazo(valor,evento){
    valor.beginPath();
    valor.moveTo(evento.offsetX, evento.offsetY);
}
function MoverTrazo(valor,evento){
    valor.lineTo(evento.offsetX, evento.offsetY);
    valor.stroke();
    valor.strokeStyle = "red";
    valor.lineWidth = 3;
}

firmaTecnico.addEventListener("mousedown", function(e){
    dibujandoTecnico = true;
    EmpezarTrazo(ctxTecnico,e);
});
firmaTecnico.addEventListener("mousemove", function(e){
         if(dibujandoTecnico == true){
           MoverTrazo(ctxTecnico,e); 
    }
});

firmaTecnico.addEventListener("mouseup",function(e){
        dibujandoTecnico = false;
        console.log("Terminando de dibujar en la firma del tecnico");
    });



firmaCliente.addEventListener("mousedown", function(e){
    dibujandoCliente = true;
    EmpezarTrazo(ctxCliente,e);
});

firmaCliente.addEventListener("mousemove", function(e){
    if(dibujandoCliente ==true){
        MoverTrazo(ctxCliente,e)
    }
})
firmaCliente.addEventListener("mouseup",function(e){
    dibujandoCliente = false;
    console.log("Terminando de dibujar en la firma del cliente");
});