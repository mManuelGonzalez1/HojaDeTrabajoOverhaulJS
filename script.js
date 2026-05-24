//Definicion de variables
const tipoServicio = document.getElementById("tipoServicio");
const SeccionEntrega= document.getElementById("entrega");
const SeccionPreventivo = document.getElementById("preventivo");
const SeccionCorrectivo = document.getElementById("correctivo");
const SeccionRetiro = document.getElementById("retiro");

//Seccion insumos mto prev
const tablaInsumosPreventivo =  document.getElementById("tablaInsumosPreventivo");
const botonAñadir = document.getElementById("agregarInsumo");
const filaInsumo= document.getElementsByClassName("fila-insumo");
//Mapa fotos entrega y retiro y repuestos correctivo y preventivo
const configuracionFotos = [
    { input: fotoMontacarga, contenedor: contenedorFotosMontacarga },
    { input: fotoCargador, contenedor: contenedorFotosCargador },
    { input: fotoBateria, contenedor: contenedorFotosBateria },
    { input: fotoMontacargaRetiro, contenedor: contenedorFotosMontacargaRetiro },
    { input: fotoCargadorRetiro, contenedor: contenedorFotosCargadorRetiro },
    { input: fotoBateriaRetiro, contenedor: contenedorFotosBateriaRetiro },
    { input: fotoRepuestosPreventivo, contenedor: contendorFotosRepuestosPreventivo },
    { input: fotoRepuestosCorrectivo, contenedor: contendorFotosRepuestosCorrectivo }
];
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
let dibujandoTecnico = false;
let dibujandoCliente = false;
const lienzoVacio = firmaTecnico.toDataURL();
let fotosMontacargaBase64=[];//Array para guarar las fotos que subamos del montacarga en base 64
let fotosBateriaBase64=[];//Array para guarar las fotos que subamos de bateria en base 64
let fotosCargadorBase64=[];//Array para guarar las fotos que subamos del cargador en base 64
//Guardar todos los datos 
const botonEnviarFormulario = document.getElementById("btnEnviar"); 

//FUNCIONES 
//Funcion para empaquetar vistaprevia fotos  
function procesarFotos(ContenedorFotos, InputFoto) {
    // 1. Limpiamos el contenedor antes de empezar,esto con el fin de que si 
    //hay mas fotos, no se acumulen en el contenedor, 
    // sino que se reemplacen por las nuevas fotos seleccionadas
    ContenedorFotos.innerHTML="";
    //Creamos el for para que itere en todas las fotos
    for(let foto of InputFoto.files){
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
       }
    }

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

/*function enviarFotosEntregaServidor(InputFoto,arrayDestino){ funcion en construcion se necesita ver async y await
for(let foto of InputFoto.files){
    
        const Lector = new FileReader();
        // 2. Creamos un nuevo elemento de imagen para cada foto seleccionada, 
        // y le asignamos la URL de la foto utilizando URL
         //5. Creamos esta funcion para volver las imagenes previas
         // un texto64 y que el servidor o pdf las puedan leer
         Lector.onload = function(evento){
            // Este código solo se ejecuta cuando el lector termina
            const textoBase64 = evento.target.result; // Aquí está tu texto largo
            arrayDestino.push(textoBase64)       
       }
        //Leer el archivo
       return Lector.readAsDataURL(foto);
    }*/


//EVENTOS 

//Ocultar o mostrar secciones dependiendo del tipo de servicio seleccionado
tipoServicio.addEventListener("change",function hola(){
    SeccionEntrega.style.display = "none";
    SeccionPreventivo.style.display = "none";
    

    if(tipoServicio.value === "4"){
        SeccionEntrega.style.display = "block";
        
    }else if(tipoServicio.value === "2"){
        SeccionPreventivo.style.display = "block";

    }else if(tipoServicio.value === "1"){
        SeccionCorrectivo.style.display = "block";
    }else if(tipoServicio.value === "5"){
        SeccionRetiro.style.display = "block";
    }

})

//EVENTO para mostrar la foto de la montacarga dependiendo del modelo seleccionado y fotos de repuestos correctivo y preventivo
for(let par of configuracionFotos){
    par.input.addEventListener("change",function(){
        procesarFotos(par.contenedor,par.input)
    })
}


//EVENTO para boton de agregar Insumos
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
})

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


//Evento de escucha boton de enviar para recolectar toda la info y enviarla al servidor
botonEnviarFormulario.addEventListener("click", function(){
    //Recolectar imagenes de firmas de el cliente
    const firmaActual= firmaCliente.toDataURL();
    if(firmaActual == lienzoVacio){
        alert("FIRMA EL DOCUMENTO POR FAVOR");
    }else{
            alert("FIRMA GUARDADA ");
            console.log(firmaActual);

        }
    //Recolectar la informacion de las imagenes del montacara,bateria y cargador
    console.log(enviarFotosEntregaServidor(fotoMontacarga,fotosMontacargaBase64));
    console.log(enviarFotosEntregaServidor(fotoBateria,fotosBateriaBase64));
    console.log(enviarFotosEntregaServidor(fotoCargador,fotosCargadorBase64));
})
