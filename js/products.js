
var ProductsArray = [];
var ProductsArrayInicial = []; //para tener siempre cargado el array inicial

function listaProductosCuadricula(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `<div class="col-md-4 n" >
        <a href="product-info.html" class="card mb-4 shadow-sm custom-card list-group-item-action" style="width: 300px; height:470px;">
          <img class="bd-placeholder-img card-img-top" src= `+ product.imgSrc + `>
          <h3 class="m-3">`+ product.name + `</h3>
          <div class="card-body ">
            <p class="card-text">` + product.description + `</p>
            <p>` + `Costo:` + `  ` + product.cost + `  ` + product.currency + `</p>
            <small class="text-muted">` + product.soldCount + ` vendidos</small>
          </div>
         
        </a>
      </div>
    `
        document.getElementById("cuadriculaProductos").innerHTML = htmlContentToAppend;
    }

}

function OrdenarAsc_O_Desc(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
            y = b[key];                                  // la funcion "sort()" ordena la lista y recibe como parametro otra funcion
        if (orden === 'asc') {                           //y esta debe ser una función que reciba como                       
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));   //parámetros dos elementos del tipo con el que trabaja el array y 
        }                                                //devuelva un número negativo si el primer elemento debe ordenarse antes que el segundo, 
        //cero si ambos elementos tienen igual orden, o un número positivo si el segundo elemento 
        if (orden === 'desc') {                          // debe ordenarse antes que el primero.
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));   // Operador Ternario --> Tiene la forma de: condition ? value-if-true : value-if-false
        }

    });
}
function ordenarPrecioAsc() {
    
    OrdenarAsc_O_Desc(ProductsArray, 'cost', 'asc');
    listaProductosCuadricula(ProductsArray);

}
function ordenarPrecioDesc() {
    
    OrdenarAsc_O_Desc(ProductsArray, 'cost', 'desc');
    listaProductosCuadricula(ProductsArray);

}
function ordenarPorRelevanciaDesc() {
    
    OrdenarAsc_O_Desc(ProductsArray, 'soldCount', 'desc')
    listaProductosCuadricula(ProductsArray);
}

function filtrarPorPrecio() {
    if (document.getElementById("min").value == "" || document.getElementById("max").value == "") {
        document.getElementById("alertaproductos").innerHTML = `<div class="alert alert-danger" align="center">
      <strong> ¡Por favor, ingrese precios máximo y mínimo!
  </strong> 
</div>`

    } else {
        document.getElementById("alertaproductos").innerHTML = "";
        let min = document.getElementById("min").value,
            max = document.getElementById("max").value;
        let newArray = ProductsArray.filter(function (el) {
            return el.cost <= max &&
                el.cost >= min
        });
        if (newArray.length != 0) {
            ProductsArray = newArray;    //para poder ordenar por precio lo filtrado
            listaProductosCuadricula(ProductsArray);
        } else
            document.getElementById("cuadriculaProductos").innerHTML = ""
    }
}
function limpiar() {
    document.getElementById("min").value = ""
    document.getElementById("max").value = ""
    ProductsArray = ProductsArrayInicial;    //vuelve todo a como estaba al principio
    listaProductosCuadricula(ProductsArray);
}
function irAProductsInfo() {
    window.location = "product-info.html";
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsArrayInicial = resultObj.data;
            ProductsArray = ProductsArrayInicial;
            listaProductosCuadricula(ProductsArrayInicial);
        }
    });
});







