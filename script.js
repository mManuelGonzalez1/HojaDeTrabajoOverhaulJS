//Definicion de variables
const tipoServicio = document.getElementById("tipoServicio");
const SeccionEntrega= document.getElementById("entrega");
const SeccionPreventivo = document.getElementById("preventivo");
const fotoMontacarga = document.getElementById("fotoMontacarga");

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
    
})