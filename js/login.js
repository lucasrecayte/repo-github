//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


});
function validarUsuario(valor) {
    if (valor == "") {
        document.getElementById("error").innerHTML = "ingrese su usuario";
    }

};
function validarContra(valor) {
    if (valor == "") {
        document.getElementById("error2").innerHTML = "ingrese su contraseña";
    }

};



function abrirPrincipal() {
    var user = document.getElementById('usuario').value
    var contra = document.getElementById('contra').value

    if (user !== "" && contra !== "") {


        window.location.assign("principal.html");

    } else
        document.getElementById("ok").innerHTML = "revise los datos";
}

