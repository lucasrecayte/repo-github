var Carrito = {};
var mensajeExito = "";

function cargarCarrito(JSONcarritos) {
  let sumaDeSubtotales = 0;
  let sumatoriaDeArticulos = 0;
  let htmlContentToAppend = "";
  let subtotalArticulo = 0;
  for (let i = 0; i < JSONcarritos.articles.length; i++) {
    let unCarrito = JSONcarritos.articles[i];

    let precioUnitario = dolarOpeso(unCarrito); //veo si esta en dolares

    subtotalArticulo = precioUnitario * unCarrito.count;

    sumaDeSubtotales = sumaDeSubtotales + subtotalArticulo;  //voy calculando el subtotal total

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

function modificarTodo() {//funcion que al agregar un articulo o seleccionar un metodo de entrega o metodo de envio, modifica todo lo necesario
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

    let valorEnvio = 0;  //inicializo el envio en cero, segun el tipo de envio modifico lo que se muestra
    if (document.getElementById("local").checked) {
      document.getElementById("envio").innerHTML = valorEnvio
    } else if (document.getElementById("domicilio").checked) {
      if (document.getElementsByName("tipoEnvio")[0].checked) { //si se elige envio normal
        valorEnvio = nuevoSubtotal * 0.05;
        document.getElementById("envio").innerHTML = valorEnvio;
      } else if (document.getElementsByName("tipoEnvio")[1].checked) {  // si se elige envio rapido
        valorEnvio = nuevoSubtotal * 0.1;
        document.getElementById("envio").innerHTML = valorEnvio;
      } else valorEnvio = nuevoSubtotal * 0.15   // solo queda envio premium
      document.getElementById("envio").innerHTML = valorEnvio;
    }

    document.getElementById("total").innerHTML = nuevoSubtotal + nuevoIVA + valorEnvio;
  }


}
function BorrarArticulo(boton) {  //para borrar un articulo, cada boton tiene como valor (.value) la posicion del articulo en el arreglo
  let posicion = parseInt(boton);
  Carrito.articles.splice(posicion, 1); //al carrito inicial, le saco en la posicion dada por el boton, un articulo
  if (Carrito.articles.length > 0) {  //porque si tengo un carrito vacio no tiene que mostrar nada
    cargarCarrito(Carrito);
    modificarTodo();
  } else {
    document.getElementById("columnaArticulos").innerHTML = "";
    document.getElementById("cantidadArtEnCarrito").innerHTML = "";
    document.getElementById("subtotal").innerHTML = "";
    document.getElementById("iva").innerHTML = "";
    document.getElementById("envio").innerHTML = "";
    document.getElementById("total").innerHTML = "";

  }
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

function desplegarFormulario() {
  document.getElementById("seleccionarPago").innerHTML = "";
  if (!document.getElementById("efectivo").checked) {  //desplego el formulario de tarjeta de credito

    document.getElementById("formulario").innerHTML = `<div class="container-fluid">
  <hr>
  <div class="row">
      <div class="col-sm-12">
          <div class="card">
              <div class="card-header">
                  <strong>Tarjeta de crédito</strong>
                  <small>Ingrese los detalles de su tarjeta</small>
              </div>
              <div class="card-body">
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-group">
                              <label for="name">Nombre completo</label>
                              <input class="form-control" id="nombreEnFormulario" type="text" placeholder="Ingrese su nombre completo" required>
                              <span class="alert-danger" style = "color:red" id = "alertaNombre"></span>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-group">
                              <label for="ccnumber">Número tarjeta de crédito</label>
                              <div class="input-group">
                                  <input class="form-control" type="number"  placeholder="0000 0000 0000 0000" id="tarjetaEnFormulario">
                                  
                                  <div class="input-group-append">
                                      <span class="input-group-text">
                                          <i class="mdi mdi-credit-card"></i>
                                      </span>
                                      
                               </div>
                              
                              </div>
                              <span class="alert-danger" style = "color:red" id = "alertaTarjeta"></span>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="form-group col-sm-4">
                          <label for="ccmonth">Mes</label>
                          <select class="form-control" id="ccmonth">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                          </select>
                      </div>
                      <div class="form-group col-sm-4">
                          <label for="ccyear">Año</label>
                          <select class="form-control" id="ccyear">
                              <option>2020</option>
                              <option>2021</option>
                              <option>2022</option>
                              <option>2023</option>
                              <option>2024</option>
                              <option>2025</option>
                              <option>2026</option>
                              <option>2027</option>
                              <option>2028</option>
                              <option>2029</option>
                              <option>2030</option>
                              <option>2031</option>
                          </select>
                      </div>
                      <div class="col-sm-4">
                          <div class="form-group">
                              <label for="cvv">CVV/CVC</label>
                              <input class="form-control" id="cvv" type="number" placeholder="123">
                              <span class="alert-danger" style = "color:red" id = "alertaCodigo"></span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer">

                 
              </div>
          </div>
      </div>
  </div>
</div>`                                                       //desplego formulario de efectivo
  } else document.getElementById("formulario").innerHTML = `   
  <hr>
  <div class="card-header">
                  <strong>Efectivo</strong>
                  
              </div>
  <form>
  <div class="row">
    <div class="col">
      <input type="text" class="form-control" placeholder="Ingrese su nombre completo" id="nombreEfectivo">
       <span class="alert-danger" style = "color:red" id = "alertaNombreEfectivo"></span>
    </div>
 </div>
</form>`;
}

function ElegirEnvio() {
  if (document.getElementById("domicilio").checked) {  //si se elige envio a domicilio, despliego tipos de envio y formulario
    document.getElementById("envioAdomicilio").innerHTML = `
<div class="list-group checkbox-list-group">  
                <div class="list-group-item list-group-item-primary"><label><input type="radio" name="tipoEnvio" oninput="modificarTodo()"><span class="list-group-item-text" style="padding-left: 10px;">ENVÍO NORMAL (5% Subtotal): <span class="badge badge-primary badge-pill" >20 - 30 días</span></span></label></div>
                <div class="list-group-item list-group-item-primary"><label><input type="radio" name="tipoEnvio" oninput="modificarTodo()"><span class="list-group-item-text" style="padding-left: 10px;"> ENVÍO RÁPIDO (10% Subtotal): <span class="badge badge-primary badge-pill">10 - 15 días</span></span></label></div>
                <div class="list-group-item list-group-item-primary"><label><input type="radio" name="tipoEnvio" oninput="modificarTodo()"><span class="list-group-item-text" style="padding-left: 10px;"></span>ENVÍO PREMIUM (15% Subtotal): <span class="badge badge-primary badge-pill">2 - 4 días</span></label></div>
         </div><br>
         <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="direccionEnvio">Dirección</label>
                  <input type="text" class="form-control" id="direccionEnvio" required>
                  <div class="alert-danger" id="alertaDireccionEnvio">
                    
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="departamento">Departamento</label>
                  <select class="custom-select" id="departamento" required>
                    <option selected disabled value="">Elige...</option>
                    <option>Artigas</option>
                    <option>Canelones</option>
                    <option>Cerro Largo</option>
                    <option>Colonia</option>
                    <option>Durazno</option>
                    <option>Flores</option>
                    <option>Florida</option>
                    <option>Lavalleja</option>
                    <option>Maldonado</option>
                    <option>Montevideo</option>
                    <option>Paysandú</option>
                    <option>Río Negro</option>
                    <option>Rivera</option>
                    <option>Rocha</option>
                    <option>Salto</option>
                    <option>San José</option>
                    <option>Soriano</option>
                    <option>Tacuarembó</option>
                    <option>Treinta y Tres</option>
                    </select>
                  <div class="alert-danger" id="alertaDepartamento">
                   
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="codigoPostal">Codigo postal</label>
                  <input type="text" class="form-control" id="codigoPostal" required>
                  <div class="alert-danger" id="alertaCodigoPostal">
                    
                  </div>
                </div>
               
              </div>`
  } else
    document.getElementById("envioAdomicilio").innerHTML = ""
}

function finalizarCompra() {
  if ((document.getElementById("local").checked || (document.getElementById("domicilio").checked &&
    (document.getElementsByName("tipoEnvio")[0].checked || document.getElementsByName("tipoEnvio")[1].checked ||
      document.getElementsByName("tipoEnvio")[2].checked))) //condicion de haber seleccionado metodo de envio
    &&
    (document.getElementById("tarjeta1").checked || document.getElementById("tarjeta2").checked ||
      document.getElementById("tarjeta3").checked || document.getElementById("paypal").checked ||
      document.getElementById("efectivo").checked)) { // condicion de haber seleccionado metodo de pago
    document.getElementById("alerta").innerHTML = `<div class="alert alert-success">
        <strong> `+ mensajeExito.msg + `
    </strong> 
  </div>
  </div>`
  } else
    document.getElementById("alerta").innerHTML = `<div class="alert alert-danger">
      <strong> ¡Por favor, seleccione un método de envío y una forma de pago!
  </strong> 
</div>
</div>`
  if (document.getElementById("direccionEnvio").value === "") {
    document.getElementById("alertaDireccionEnvio").innerHTML = "Por favor, introduzca su dirección"
  } else document.getElementById("alertaDireccionEnvio").innerHTML = "";

  if (document.getElementById("departamento").value === "") {
    document.getElementById("alertaDepartamento").innerHTML = "Por favor, introduzca su departamento"
  } else document.getElementById("alertaDepartamento").innerHTML = "";

  if (document.getElementById("codigoPostal").value === "") {
    document.getElementById("alertaCodigoPostal").innerHTML = "Por favor, introduzca su código postal"
  } else document.getElementById("alertaCodigoPostal").innerHTML = "";

}

function validarFormulario() { //muchas condciones para que haga lo necesario

  if (document.getElementById("tarjeta1").checked || document.getElementById("tarjeta2").checked ||
    document.getElementById("tarjeta3").checked || document.getElementById("paypal").checked ||
    document.getElementById("efectivo").checked) {

    document.getElementById("seleccionarPago").innerHTML = "";
    if (document.getElementById("efectivo").checked) { //se selecciona efectivo
      let condicion4 = document.getElementById("nombreEfectivo").value === "";
      if (condicion4) {
        document.getElementById("alertaNombreEfectivo").innerHTML = "ingrese su nombre";
      } else {
        document.getElementById("alertaNombreEfectivo").innerHTML = "";
        cerrarModal();
      }
    } else { //se selecciona alguna tarjeta
      let condicion1 = document.getElementById("nombreEnFormulario").value === "";
      let condicion2 = document.getElementById("tarjetaEnFormulario").value === "";
      let condicion3 = document.getElementById("cvv").value === "";
      if (condicion1) {
        document.getElementById("alertaNombre").innerHTML = "ingrese su nombre";
      } else document.getElementById("alertaNombre").innerHTML = "";

      if (condicion2) {
        document.getElementById("alertaTarjeta").innerHTML = "ingrese su tarjeta"
      } else document.getElementById("alertaTarjeta").innerHTML = "";

      if (condicion3) {
        document.getElementById("alertaCodigo").innerHTML = "ingrese su código CVV/CVC"
      } else document.getElementById("alertaCodigo").innerHTML = "";

      if (!condicion1 && !condicion2 && !condicion3) {
        cerrarModal()
      }
    }
  } else {
    document.getElementById("seleccionarPago").innerHTML = "Por favor, seleccione uno de los medios de pago mostrados"
  }
}

function abrirModal() { //ejecuto en boton de abrir modal
  $('#modal').modal('show');            //encontre en internet que con JQuery es muy facil abrir y cerrar modales
}
function cerrarModal() {  //ejecuto si se verifica el formulario

  $('#modal').modal('hide');

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_DOS_PRODUCTOS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      Carrito = resultObj.data;
      cargarCarrito(Carrito); // esta funcion toma como parametro un JSON de un carrito con articulos

    }
  });

  getJSONData(CART_BUY_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      mensajeExito = resultObj.data;

    }
  });

});





