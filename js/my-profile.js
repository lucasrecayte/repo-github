var perfil = {    //perfil a rellenar
    "nombre": "",
    "apellido": "",
    "sexo": "",
    "edad": "",
    "email": "",
    "telefono": "",
};

if (sessionStorage.getItem("perfil") == null) {   //inicialmente como no hay nada en el storage, cargo un perfil vacio
    let JSONperfilVacio = JSON.stringify(perfil);
    sessionStorage.setItem("perfil", JSONperfilVacio);
} else {  //para cuando se sale de la pestana mi perfil, no se pierdan los datos en los campos

    perfilEnStorage = JSON.parse(sessionStorage.getItem("perfil"))  //transformo el JSON

    document.getElementById("nombrePerfil").value = perfilEnStorage.nombre;

    document.getElementById("apellidoPerfil").value = perfilEnStorage.apellido;

    if (perfilEnStorage.sexo != "") {
        document.getElementById("sexoPerfil").value = perfilEnStorage.sexo;
    };

    document.getElementById("edadPerfil").value = perfilEnStorage.edad;

    document.getElementById("emailPerfil").value = perfilEnStorage.email;

    document.getElementById("telefonoPerfil").value = perfilEnStorage.telefono;
}

function guardarCambios() {   //voy actualizando el perfil cuando el usuario ingresa
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

    sessionStorage.setItem("perfil", JSONperfil);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});