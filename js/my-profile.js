var perfil = {    //perfil a rellenar
    "nombre": "",
    "apellido": "",
    "sexo": "",
    "edad": "",
    "email": "",
    "telefono": "",
};
function cargarPerfil() {
    document.getElementById("alertaPerfil").innerHTML = ""; //para borrar mensaje de exito

    if (localStorage.getItem("perfil") == null) {   //inicialmente como no hay nada en el storage, cargo un perfil vacio
        let JSONperfilVacio = JSON.stringify(perfil);
        localStorage.setItem("perfil", JSONperfilVacio);
    } else {  //para cuando se sale de la pestana mi perfil, no se pierdan los datos en los campos

        let perfilEnStorage = JSON.parse(localStorage.getItem("perfil"));  //transformo el JSON

        document.getElementById("nombrePerfil").value = perfilEnStorage.nombre;

        document.getElementById("apellidoPerfil").value = perfilEnStorage.apellido;

        if (perfilEnStorage.sexo != "") {
            document.getElementById("sexoPerfil").value = perfilEnStorage.sexo;
        };

        document.getElementById("edadPerfil").value = perfilEnStorage.edad;

        document.getElementById("emailPerfil").value = perfilEnStorage.email;

        document.getElementById("telefonoPerfil").value = perfilEnStorage.telefono;
    }
}
function guardarCambios() {
    let val1, val2, val3, val4, val5, val6;

    if (document.getElementById("nombrePerfil").value == "") {
        document.getElementById("alertaNombrePerfil").innerHTML = "Por favor, ingrese su nombre";
        val1 = false;
    } else {
        document.getElementById("alertaNombrePerfil").innerHTML = "";
        val1 = true;
    };

    if (document.getElementById("apellidoPerfil").value == "") {
        document.getElementById("alertaApellidoPerfil").innerHTML = "Por favor, ingrese su apellido";
        val2 = false;
    } else {
        document.getElementById("alertaApellidoPerfil").innerHTML = "";
        val2 = true;
    };

    if (document.getElementById("sexoPerfil").value == "Elige...") {
        document.getElementById("alertaSexoPerfil").innerHTML = "Por favor, seleccione su sexo";
        val3 = false;
    } else {
        document.getElementById("alertaSexoPerfil").innerHTML = "";
        val3 = true;
    };

    if (document.getElementById("edadPerfil").value == "") {
        document.getElementById("alertaEdadPerfil").innerHTML = "Por favor, ingrese su edad";
        val4 = false;
    } else {
        document.getElementById("alertaEdadPerfil").innerHTML = "";
        val4 = true;
    };

    if (document.getElementById("emailPerfil").value == "") {
        document.getElementById("alertaEmailPerfil").innerHTML = "Por favor, ingrese su email";
        val5 = false;
    } else {
        document.getElementById("alertaEmailPerfil").innerHTML = "";
        val5 = true;
    };

    if (document.getElementById("telefonoPerfil").value == "") {
        document.getElementById("alertaTelefonoPerfil").innerHTML = "Por favor,ingrese su teléfono";
        val6 = false;
    } else {
        document.getElementById("alertaTelefonoPerfil").innerHTML = "";
        val6 = true;
    };

    if (val1 && val2 && val3 && val4 && val5 && val6) {
        subirAlStorage();
        document.getElementById("alertaPerfil").innerHTML = `<div class="alert alert-success" align="center"> 
        <strong>`+ "¡Datos guardados con éxito!" + `</strong>`
    };    //mensaje de exito

}

function subirAlStorage() {   //voy actualizando el perfil cuando el usuario ingresa todos
                              // sus datos   
    perfil.nombre = document.getElementById("nombrePerfil").value;
    perfil.apellido = document.getElementById("apellidoPerfil").value;

    if (document.getElementById("sexoPerfil").value != "Elige...") {
        perfil.sexo = document.getElementById("sexoPerfil").value;
    };

    perfil.edad = document.getElementById("edadPerfil").value;

    perfil.email = document.getElementById("emailPerfil").value;

    perfil.telefono = document.getElementById("telefonoPerfil").value;

    let JSONperfil = JSON.stringify(perfil);  //transformo el perfil a formato JSON

    localStorage.setItem("perfil", JSONperfil);
}

function reestablecer() {
    document.getElementById("alertaPerfil").innerHTML = ""; //para borrar mensaje de exito
    document.getElementById("nombrePerfil").value = "";     // borro campos mostrados en pantalla
    document.getElementById("apellidoPerfil").value = "";
    document.getElementById("sexoPerfil").value = "Elige...";
    document.getElementById("edadPerfil").value = "";
    document.getElementById("emailPerfil").value = ""
    document.getElementById("telefonoPerfil").value = "";

    let perfilEnStorageABorrar = JSON.parse(localStorage.getItem("perfil"));  //transformo el JSON

    perfilEnStorageABorrar.nombre = "";        //borro todo el perfil en el localstorage
    perfilEnStorageABorrar.apellido = "";
    perfilEnStorageABorrar.sexo = "";
    perfilEnStorageABorrar.edad = "";
    perfilEnStorageABorrar.email = "";
    perfilEnStorageABorrar.telefono = "";

    let JSONperfilEnStorageABorrar = JSON.stringify(perfilEnStorageABorrar); //transformo a formato JSON
    localStorage.setItem("perfil", JSONperfilEnStorageABorrar);     //subo perfil vacio
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    cargarPerfil()

});