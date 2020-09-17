var ProductsInfo = {},
    comments = [],
    relacionados = [];

function mostrarImagenes(array) {


    
    document.getElementById("im0").src = array[0];
    document.getElementById("im1").src = array[1];
    document.getElementById("im2").src = array[2];
    document.getElementById("im3").src = array[3];
    document.getElementById("im4").src = array[4];


}

function mostrarComentarios() {
    let htmlContentToAppend = "";
    for (let i = 0; i < comments.length; i++) {
        let unComentario = comments[i];

        htmlContentToAppend += `
        <div class="list-group-item " style="background-color: lightgray;">
  <div class="row">

    <div name="estrellas" class="col-3"> </div>
    <div class="col">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">`+ "Usuario: " + unComentario.user + ` </h5>
        <small class="text-muted">` + "Fecha: " + unComentario.dateTime + ` </small>
      </div>
      <div>` + "&#34" + unComentario.description + "&#34" + `</div>
    </div>
  </div>
</div>
<br>
    `

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;


    }

    mostrarEstrellas()

}


function mostrarEstrellas() {
    for (let i = 0; i < comments.length; i++) {
        let unComentario = comments[i];
        let estrellas = "";

        for (let e = 0; e < unComentario.score; e++) {
            estrellas += `<span class="fa fa-star checked"></span>`
            document.getElementsByName("estrellas")[i].innerHTML = estrellas;
        }

        for (let u = unComentario.score + 1; u <= 5; u++) {
            document.getElementsByName("estrellas")[i].innerHTML += `<span class="fa fa-star"></span>`

        }

    }

}


function Comentario() {
    let nuevaLista = {};
    let comentario = "";
    let puntuacion = "";
    let usuario = window.sessionStorage.getItem('keyuser');
    var today = new Date();
    let dia = today.getDate();
    let mes = today.getMonth();
    let ano = today.getFullYear();
    let hora = today.getHours();
    let minuto = today.getMinutes();
    let segundo = today.getSeconds();
    let fecha = ano + "-" + "0" + (mes + 1) + "-" + dia + " " + hora + ":" + minuto + ":" + segundo
    comentario = document.getElementById("nuevoComentario").value;
    puntuacion = parseInt(document.getElementById("punt").value);
    nuevaLista.score = puntuacion;
    nuevaLista.description = comentario;
    nuevaLista.user = usuario;
    nuevaLista.dateTime = fecha;

    console.log(nuevaLista)

    if (comentario != "" && document.getElementById("punt").value != "Elige...") {

        comments.push(nuevaLista);
        mostrarComentarios()
        document.getElementById("alerta").innerHTML = ""
    } else
        document.getElementById("alerta").innerHTML = "Complete los campos"

}

function ProductosRelacionados(array){
    let htmlContentToAppend = "";
    
    for (let i = 1; i < array.length; i = i + 2) {
        let Relacionada = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action"  style="cursor: pointer" onclick = "irAProductsInfo()">
            <div class="row" > 

                <div class="col-3">
                    <img src="` + Relacionada.imgSrc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+Relacionada.name + `</h4>
                        <small class="text-muted">` + Relacionada.soldCount + ` vendidos</small>
                    </div>
                     <div>` + Relacionada.description + `</div>
                     <br> 
                     <div>` + `Costo:` + `  ` + Relacionada.cost + `  ` + Relacionada.currency + `</div>
                                     
                </div>
            </div>
        </div>
        `


        document.getElementById("relacionados").innerHTML = htmlContentToAppend;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsInfo = resultObj.data;

            document.getElementById("categoria").innerHTML = ProductsInfo.category
            document.getElementById("nombre").innerHTML = ProductsInfo.name
            document.getElementById("descripcion").innerHTML = ProductsInfo.description
            document.getElementById("costo").innerHTML = ProductsInfo.cost + " " + ProductsInfo.currency
            document.getElementById("cantidad").innerHTML = ProductsInfo.soldCount


            mostrarImagenes(ProductsInfo.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data

        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            relacionados = resultObj.data;


            ProductosRelacionados(relacionados)
        }
    });

});