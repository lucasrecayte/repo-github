/*
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
   document.getElementById("precioArticulo2").innerHTML += producto2.currency + " " + producto2.unitCost + " " + "( UYU " + producto2.unitCost * 40 + " )";
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



function modificarTodo() {   //funcion que al agregar un articulo o seleccionar un metodo de entrega, modifica todo lo necesario
   
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
}*/
var Carrito = {};
var sumaDeSubtotales = 0;

function cargarCarrito(JSONcarritos, lugarPrimerArticuloEnArreglo,cantidadArticulosEnCarrito) {
    let sumatoriaDeArticulos = 0;
    let htmlContentToAppend = "";

    for (let i = lugarPrimerArticuloEnArreglo; i <= cantidadArticulosEnCarrito-1; i++) {
        let unCarrito = JSONcarritos.articles[i];

        let precioUnitario = dolarOpeso(unCarrito); //veo si esta en dolares


        sumaDeSubtotales = sumaDeSubtotales + precioUnitario;  //voy calculando el subtotal total

        sumatoriaDeArticulos = sumatoriaDeArticulos + unCarrito.count; //voy calculando la suma total de articulos

        htmlContentToAppend += `
        <hr style="border-color:black;">
<div class="container" name="unArticulo">  
  <div class="row">  
    <div class="col-5">
      <img src="`+ unCarrito.src + `" class="img-fluid w-100">
      <br><br>
      <button type="button" class="btn btn-outline-danger btn-sm" name="boton" value="`+ i + `" onclick="BorrarArticulo(this.value)">Eliminar artículo</button>
    </div>
    <div class="col-7">
      <div class="d-flex justify-content-between">
        <div>
          <h5>Nombre del artículo:</h5>
          <p class="mb-3 text-muted text-uppercase media">`+ unCarrito.name + `</p>
          <h5 >Costo unitario:</h5>
          <p class="mb-3 text-muted text-uppercase media " name="costoUnitario">` + "UYU " + precioUnitario + " ( USD " + precioUnitario / 40 + " )" + ` </p>
          <h5>Cantidad:</h5>
          <!-- lo obtuve de https://mdbootstrap.com/docs/jquery/forms/inputs/-->
          <div class="def-number-input number-input safari_only">
            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();modificarTodo()"
              class="minus"></button>
            <input class="form-control" min="1"name="cantidadArticulos" type="number"
              oninput="modificarTodo()" value ="`+ unCarrito.count + `">
            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();modificarTodo()"
              class="plus"></button>
          </div>
          <!--  -->
          <br>
          <h5>Subtotal del artículo:</h5>
          <p class="mb-3 text-muted text-uppercase media" name="costoXcantidad">` + "UYU " + precioUnitario * unCarrito.count + `</p>

        </div>
     </div>
    </div>
    </div>
  </div>
<hr style="border-color:black;">
`
        //cargo todo
        document.getElementById("cantidadArtEnCarrito").innerHTML = sumatoriaDeArticulos;
        document.getElementById("columnaArticulos").innerHTML = htmlContentToAppend;
        document.getElementById("subtotal").innerHTML = sumaDeSubtotales;
        document.getElementById("iva").innerHTML = calcularIVA(sumaDeSubtotales);
        document.getElementById("envio").innerHTML = 0; //todavia no elegi envio
        document.getElementById("total").innerHTML = sumaDeSubtotales + calcularIVA(sumaDeSubtotales);
    }
};
function modificarTodo() {
    let numeroDeArticulos = document.getElementsByName("unArticulo").length;  //por si borro algun articulo que funcione igual
    let nuevoSubtotal = 0; //voy a almacenar el subtotal total aca
    let productosEncarrito = 0; //voy a almacenar la cantidad absoluta de articulos aca
    for (let i = 0; i < numeroDeArticulos; i++) {
        unCarrito = Carrito.articles[i];
        let nuevoCosto = dolarOpeso(unCarrito); // en realidad el costo es el mismo de antes

        let nuevaCantidad = parseFloat(document.getElementsByName("cantidadArticulos")[i].value); //usuario ingresa nueva cantidad
        productosEncarrito = productosEncarrito + nuevaCantidad;
        document.getElementById("cantidadArtEnCarrito").innerHTML = productosEncarrito;

        let nuevoCostoXCantidad = ProductoCostoXCantidad(nuevoCosto, nuevaCantidad);
        document.getElementsByName("costoXcantidad")[i].innerHTML = "UYU " + nuevoCostoXCantidad; //modifico nuevo subtotal de cada articulo

        nuevoSubtotal = nuevoSubtotal + nuevoCostoXCantidad; //almaceno la suma de subtotales individuales
        document.getElementById("subtotal").innerHTML = nuevoSubtotal; //modifico nuevo subtotal total

        let nuevoIVA = calcularIVA(nuevoSubtotal);

        document.getElementById("iva").innerHTML = nuevoIVA; //nuevo iva

        let valorEnvio = 0;  //inicializo el envio en cero, HACER ENTREGA 6

        document.getElementById("total").innerHTML = nuevoSubtotal + nuevoIVA + valorEnvio;

       

    }


}
function BorrarArticulo(boton) {  //para borrar un articulo
    let numeroDeArticulos = document.getElementsByName("unArticulo").length;

    if(parseFloat(boton) == 0){
        cargarCarrito(Carrito,1,numeroDeArticulos)  //cargo el carrito inicial y el primer lugar del articulo en el arreglo
    }else  cargarCarrito(Carrito,0,numeroDeArticulos)                                                        // me lo da el valor del boton en que se hace click
}




function dolarOpeso(article) {

    if (article.currency === 'USD') {
        return article.unitCost * 40
    } else
        return article.unitCost;
}


function calcularIVA(precio) {
    return 0.22 * precio  // IVA tomado a 22%
}

function ProductoCostoXCantidad(costo, cantidad) {
    return costo * cantidad
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_DOS_PRODUCTOS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            Carrito = resultObj.data;
            cargarCarrito(Carrito,0,Carrito.articles.length); // esta funcion toma como parametro un JSON de un carrito con articulos
            //y el lugar en el arreglo "articles" del primer articulo,ya se como es el arreglo entonces
            //el primer lugar es "0"
        }
    });

});





