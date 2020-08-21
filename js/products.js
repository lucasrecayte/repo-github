
var ProductsArray = [];

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row" > 

                <div class="col-3">
                    <img src="` + product.imgSrc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                     <div>` + product.description + `</div>
                     <br> 
                     <div>` + `Costo:` + `  ` + product.cost + `  ` + product.currency + `</div>
                                     
                </div>
            </div>
        </div>
        `


        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

}

function OrdenarAsc_O_Desc(data, key, orden) {            //encontre esta funcion en un foro de internet 
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
    showProductsList(ProductsArray)

}
function ordenarPrecioDesc() {
    OrdenarAsc_O_Desc(ProductsArray, 'cost', 'desc');
    showProductsList(ProductsArray)

}
function ordenarPorRelevanciaDesc() {
    OrdenarAsc_O_Desc(ProductsArray, 'soldCount', 'desc')
    showProductsList(ProductsArray)
}







//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsArray = resultObj.data;


            showProductsList(ProductsArray);
        }
    });
});







