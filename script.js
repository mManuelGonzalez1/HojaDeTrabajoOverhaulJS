//Definicion de variables
const tipoServicio = document.getElementById("tipoServicio");
const SeccionEntrega= document.getElementById("entrega");
const SeccionPreventivo = document.getElementById("preventivo");

//Seccion insumos mto prev
const tablaInsumosPreventivo =  document.getElementById("tablaInsumosPreventivo");
const botonAñadir = document.getElementById("agregarInsumo");
const filaInsumo= document.getElementsByClassName("fila-insumo");
//Fotos
const fotoMontacarga = document.getElementById("fotoMontacarga");
const contenedorFotosMontacarga = document.getElementById("contenedorFotosMontacarga");
const fotoBateria = document.getElementById("fotoBateria");
const contenedorFotosBateria = document.getElementById("contenedorFotosBateria");
const fotoCargador = document.getElementById("fotoCargador");
const contenedorFotosCargador = document.getElementById("contenedorFotosCargador");
//Firmas
const firmaTecnico = document.getElementById("firmaTecnico");
const firmaCliente = document.getElementById("firmaRecibe");
const eliminarFirmaTecnico = document.getElementById("eliminarFirmaTecnico");
const eliminarFirmaCliente = document.getElementById("eliminarFirmaCliente");
const guardarFirmaTecnico = document.getElementById("guardarFirmaTecnico");
const guardarFirmaCliente = document.getElementById("guardarFirmaCliente");
const ctxTecnico = firmaTecnico.getContext("2d");
const ctxCliente = firmaCliente.getContext("2d");
let imagenTecnico;
const lienzoVacio = firmaTecnico.toDataURL();
let fotosMontacargaBase64=[];//Array para guarar las fotos que subamos del montacarga en base 64
let fotosBateriaBase64=[];//Array para guarar las fotos que subamos de bateria en base 64
let fotosCargadorBase64=[];//Array para guarar las fotos que subamos del cargador en base 64

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
//Funcion para empaquetar vistaprevia fotos y leida de las mismas 
function procesarFotos(ContenedorFotos, InputFoto, arrayDestino) {
    // 1. Limpiamos el contenedor antes de empezar,esto con el fin de que si 
    //hay mas fotos, no se acumulen en el contenedor, 
    // sino que se reemplacen por las nuevas fotos seleccionadas
    ContenedorFotos.innerHTML="";
    //Creamos el for para que itere en todas las fotos
    for(let foto of InputFoto.files){
    
        const Lector = new FileReader();
        // 2. Creamos un nuevo elemento de imagen para cada foto seleccionada, 
        // y le asignamos la URL de la foto utilizando URL
        const nuevaFoto= document.createElement("img");
        nuevaFoto.src = URL.createObjectURL(foto);
        //3.Estilizamos las fotos para que se vena bien en el contendor,
         nuevaFoto.style.width = "200px";
         nuevaFoto.style.height = "200px";
         nuevaFoto.style.objectFit = "cover";
         nuevaFoto.style.margin = "10px";
         nuevaFoto.style.justifyContent = "center";
        //4. Agregamos la nueva foto al contenedor de fotos de montacarga
         ContenedorFotos.appendChild(nuevaFoto);
         //5. Creamos esta funcion para volver las imagenes previas
         // un texto64 y que el servidor o pdf las puedan leer
         Lector.onload = function(evento){
            // Este código solo se ejecuta cuando el lector termina
            const textoBase64 = evento.target.result; // Aquí está tu texto largo
            arrayDestino.push(textoBase64)       
       }
        //Leer el archivo
       Lector.readAsDataURL(foto);
    }
 }

//Funcion para mostrar la foto de la montacarga dependiendo del modelo seleccionado
fotoMontacarga.addEventListener("change", function mostrarFoto(){
    procesarFotos(contenedorFotosMontacarga,fotoMontacarga,fotosMontacargaBase64);
})
fotoCargador.addEventListener("change",function mostrarFoto(){
    procesarFotos(contenedorFotosCargador,fotoCargador,fotosCargadorBase64);
})
fotoBateria.addEventListener("change", function mostrarFoto(){
    procesarFotos(contenedorFotosBateria,fotoBateria,fotosBateriaBase64);
})

//Listener para boton de agregar Insumos
botonAñadir.addEventListener("click",function(){

    tablaInsumosPreventivo.insertAdjacentHTML("beforeend",`
        <tr class="fila-insumo">
        <td>
        <select name="insumo" class="insumo" >
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
        <select name="medida" class="Medidainsumo" >
                            <option value="0" disabled selected>Selecciona una medida</option>
                            <option value="litros" name="Litros">Litros</option>
                            <option value="bolsa" name="bolsa">Bolsa</option>
                        </select>
        </td>

        </tr>`
    )
    for (let fila of filaInsumo) {

    console.log(fila.querySelector(".insumo").value)
    console.log(fila.querySelector(".cantidad").value)
    console.log(fila.querySelector(".Medidainsumo").value)
}

})


//Espacio dibujo de firma 
//Variables
let dibujandoTecnico = false;
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
//Funcion eliminar trazo 
function eliminarTrazo(contexo,valor){
    contexo.clearRect(0, 0, valor.width, valor.height);

}
//Event listeners (oprimir,mover,soltar)
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
//Event listeners (oprimir,mover,soltar) CLIENTE
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

//Eliminar firmas con boton
eliminarFirmaCliente.addEventListener("click",function(){
   eliminarTrazo(ctxCliente,firmaCliente)  
})
eliminarFirmaTecnico.addEventListener("click", ()=>
eliminarTrazo(ctxTecnico,firmaTecnico));

//Guardar Firmas
guardarFirmaCliente.addEventListener("click",function(){
    const firmaActual= firmaCliente.toDataURL();
    if(firmaActual == lienzoVacio){
        alert("FIRMA EL DOCUMENTO POR FAVOR");
    }else{
            alert("FIRMA GUARDADA ");
            console.log(firmaActual);

        }
    })