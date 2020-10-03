var Carrito = {};
function cargarCarrito(producto1, producto2) {

    //cargo el primer producto
    document.getElementById("imagencarrito").src = producto1.src;
    document.getElementById("nombreArticulo").innerHTML = producto1.name;
    document.getElementById("precioArticulo").innerHTML += producto1.currency + " " + producto1.unitCost;
    document.getElementById("cantidadArticulos").value = producto1.count; //ya tengo predefinida la cantidad
    //costo producto *cantidad de articulos
    document.getElementById("CostoXcantidad").innerHTML = "UYU " + ProductoCostoXCantidad(producto1.unitCost, producto1.count);

    //cargo el segundo producto
    document.getElementById("imagencarrito2").src = producto2.src;
    document.getElementById("nombreArticulo2").innerHTML = producto2.name;                                                       //dolar a UYU 40
    document.getElementById("precioArticulo2").innerHTML += producto2.currency + " " + producto2.unitCost + " " + "( UYU " + producto2.unitCost * 40 + ")";
    document.getElementById("cantidadArticulos2").value = producto2.count; //ya tengo predefinda la cantidad
    //costo producto 2*cantidad de articulos 2
    document.getElementById("CostoXcantidad2").innerHTML = "UYU " + ProductoCostoXCantidad(producto2.unitCost * 40, producto2.count);

    // calculo cantidad inicial de articulos en el carrito
    document.getElementById("cantidadArtEnCarrito").innerHTML = producto1.count + producto2.count
    //calculo subtotal inicial
    let subTotal = producto1.unitCost * producto1.count + producto2.unitCost * 40 * producto2.count
    document.getElementById("subtotal").innerHTML = subTotal
    // calculo I.V.A inicial
    let iva = calcularIVA(subTotal)
    document.getElementById("iva").innerHTML = iva

    // calculo total inicial
    document.getElementById("total").innerHTML = subTotal + iva
}

function calcularIVA(precio) {
    return 0.22 * precio  // IVA tomado a 22%
}
function subTotal(num1, num2) {
    return num1 + num2
}
function ProductoCostoXCantidad(costo, cantidad) {
    return costo * cantidad
}

function modificarTodo() {   //funcion que al agregar un articulo o agregar envio a domicilio, modifica todo lo necesario
    var costo = Carrito.articles[0].unitCost;
    var costo2 = Carrito.articles[1].unitCost * 40; //conversion a UYU
    var nuevaCantidad = parseFloat(document.getElementById("cantidadArticulos").value);
    var nuevaCantidad2 = parseFloat(document.getElementById("cantidadArticulos2").value);
    var nuevoCostoXCantidad = ProductoCostoXCantidad(costo, nuevaCantidad);
    var nuevoCostoXCantidad2 = ProductoCostoXCantidad(costo2, nuevaCantidad2);
    var nuevoSubtotal = subTotal(nuevoCostoXCantidad, nuevoCostoXCantidad2);
    var nuevoIVA = calcularIVA(nuevoSubtotal);
    var valorEnvio = 0;  //inicializo el envio en cero
    // modifico el costo * cantidad, cuando se introduce nueva cantidad en el 1er producto
    document.getElementById("CostoXcantidad").innerHTML = "UYU " + nuevoCostoXCantidad;
    // modifico el costo * cantidad, cuando se introduce nueva cantidad en el 2do producto

    //modifico la nueva cantidad de articulos
    document.getElementById("cantidadArtEnCarrito").innerHTML = nuevaCantidad + nuevaCantidad2
    document.getElementById("CostoXcantidad2").innerHTML = "UYU " + nuevoCostoXCantidad2;
    // modifico el sub total con lo calculado
    document.getElementById("subtotal").innerHTML = nuevoSubtotal;
    // modifico el nuevo IVA
    document.getElementById("iva").innerHTML = nuevoIVA;
    // modifico y obtengo el valor del envio
    if (document.getElementById("local").checked) {
        document.getElementById("envio").innerHTML = 0
    } else if (document.getElementById("domicilio").checked) {
        document.getElementById("envio").innerHTML = 150
        valorEnvio = 150
    }
    // modifico el nuevo total
    document.getElementById("total").innerHTML = nuevoSubtotal + nuevoIVA + valorEnvio
}
function finalizarCompra() {
    if ((document.getElementById("local").checked || document.getElementById("domicilio").checked) &&
        (document.getElementById("tarjeta1").checked || document.getElementById("tarjeta2").checked ||
         document.getElementById("tarjeta3").checked || document.getElementById("paypal").checked ||
         document.getElementById("efectivo").checked)) {
        window.location.assign("")  //indicar luego a donde redirige cuando termina la compra
    } else 
    document.getElementById("alerta").innerHTML = `<div class="alert alert-danger">
        <strong> ¡Por favor, seleccione un método de envío y una forma de pago!
    </strong> 
  </div>
</div>`
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_DOS_PRODUCTOS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            Carrito = resultObj.data;
            var cart = Carrito.articles[0];
            var cart2 = Carrito.articles[1];
            cargarCarrito(cart, cart2)  //cargo el carrito con los datos iniciales
        }
    });

});