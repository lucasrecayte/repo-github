var Carrito = {}












//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            Carrito = resultObj.data;
            var cart = Carrito.articles[0]
            document.getElementById("imagencarrito").src = cart.src
            document.getElementById("nombreArticulo").innerHTML = cart.name
            document.getElementById("precioArticulo").innerHTML += cart.unitCost + " " + cart.currency
            document.getElementById("cantidadArticulos").value = cart.count


            
        }
    });

});