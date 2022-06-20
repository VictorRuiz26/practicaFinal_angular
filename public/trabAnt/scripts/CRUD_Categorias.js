$( document ).ready(function() {
    $("#addCategory-form").submit(
        function(){
            addCategory(name);
        },
        false
    );
    $("#addCatModal").submit(
        function(){
            addCategory(name);
        },
        false
    );
});


function getCategorias() {

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);
    
    var requestOptions = {

    method: 'GET',

    headers: myHeaders,
    
    redirect: 'follow'

    };
    

    let paginaActual = obtenerParametroURL('pagina') || 1;
    if (paginaActual == 0) paginaActual = 1;
    let desde = (paginaActual-1)*usuariosPagina;
    let limite = desde + usuariosPagina;


    fetch(`https://labinfsoft.herokuapp.com/api/categorias?limite=${limite}&desde=${desde}`, requestOptions)

    .then( response  => { 
        if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
        return response.json();
    })

    .then(result => {
            var panel = document.getElementById("panel-body-categorias");
            panel.innerHTML = "";
            const array = result.categorias;
            for(let i = 0; i <array.length; i++){
                let node = document.createElement("div");
                node.classList.add("fila", "fila-transparent");
                node.innerHTML = `<div class="checkbox-container">
                                        <input type="checkbox" name="checkboxCategoria" onclick="changeBackground2(this)" value="${ array[i]._id }" id="${ array[i]._id }">
                                        <label for="${ array[i]._id }" class="checkbox">
                                            <div class="checkbox__inner">
                                                <div class="green__ball"></div>
                                            </div>
                                        </label>
                                    </div>
                                    <span class="uid-span"> ${ array[i]._id }</span>
                                    <span class="nombre-span"> ${ array[i].nombre } </span>
                                    <span class="opciones-span" style="font-size: 1.25em;"> <i type="button" data-toggle="modal" data-target="#myModal4" onclick="prueba2('${ array[i]._id }')" class="fa fa-pencil"></i> <i  type="button" data-toggle="modal" data-target="#myModal5" onclick="viewCategory('${ array[i]._id }')" class="fa fa-eye view-icon"></i> <i onclick="deleteCategoria('${ array[i]._id }')" type="button" class="fa fa-times"></i></span>`;
                panel.appendChild(node);
            }

            paginarCategorias(paginaActual, result.total);                    
    })
        
.catch(error => { window.location.href="index.html"; });

}

function deleteCategoria(id) {

    let ok = window.confirm("¿Estás seguro de que deseas eliminar la categoría?");

    if (ok) {
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {

        method: 'DELETE',

        headers: myHeaders,

        redirect: 'follow'

        };


        fetch("https://labinfsoft.herokuapp.com/api/categorias/" + id, requestOptions)

        .then(response => response.text())

        .then(result => getCategorias())

        .catch(error => console.log('error', error));
    }
}

function deleteAllCategories() {

    let ok = window.confirm("¿Estás seguro de que deseas eliminar las categorías seleccionadas?");

    if (ok) {
        $("input:checkbox[name=checkboxCategoria]:checked").each(function() {
            
            let id = $( this ).val();
            var myHeaders = new Headers();

            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {

            method: 'DELETE',

            headers: myHeaders,

            redirect: 'follow'

            };


            fetch("https://labinfsoft.herokuapp.com/api/categorias/" + id, requestOptions)

            .then(response => response.text())

            .then(result => {document.getElementById("boton-delete-all-categorias").style.display = "none"; getCategorias() })

            .catch(error => console.log('error', error));


        })
    }
}



function addCategory(idName) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");


    var name = document.getElementById(idName).value;
    var raw = JSON.stringify({
    "nombre": name
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://labinfsoft.herokuapp.com/api/categorias", requestOptions)
    .then(response => response.json())
    .then(result => {
        getCategorias();
        document.getElementById(idName).value = "";
    })
    .catch(error => console.log('error', error));
}


function UpdateCategoria(id) {

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    myHeaders.append("Content-Type", "application/json");

    var nombre_value = document.getElementById("inputUpdateNameCategoria").value;

    
    var raw_string = JSON.stringify({
        "nombre": nombre_value
    });

    var requestOptions = {

    method: 'PUT',

    headers: myHeaders,

    body: raw_string,

    redirect: 'follow'

    };

    //$("#form-update")[0].reportValidity();

    fetch("https://labinfsoft.herokuapp.com/api/categorias/" + id, requestOptions)

    .then(response => response.text())

    .then(result => {
        getCategorias();
    })

    .catch(error => console.log('error', error));
}

function viewCategory(id) {

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);
        
    var requestOptions = {

    method: 'GET',

    headers: myHeaders,
    
    redirect: 'follow'

    };
    
    fetch(`https://labinfsoft.herokuapp.com/api/categorias/${ id }`, requestOptions)

    .then( response  => { 
        if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
        return response.json();
    }) 
    .then( resolve => {
        document.getElementById("viewNameCat").innerHTML = resolve[0].nombre;
        document.getElementById("viewIdCat").innerHTML = resolve[0]._id;
        // $('#myModal').modal('show');
        
    }) 
    .catch(error => console.log(error));
}



function paginarCategorias(paginaActual, resultTotal) {
    let contenedor = document.getElementById("paginationCategorias");
    contenedor.innerHTML = "";
    totalPaginas = Math.floor(resultTotal/usuariosPagina) + 1;
    for (var i = 1; i  < totalPaginas+1; i++) {
        let seleccionado = "";
        if (i==paginaActual) seleccionado = "boton-resaltado"; 
        let boton = `<li class="page-item ${seleccionado}"><a id="boton${i}" class="page-link" href="CRUD.html?pagina=${i}&tab=categorias">${i}</a></li>`; 
        contenedor.innerHTML += boton;
    }
}

function prueba2(id) {


    let boton = document.getElementById("saveChangesCategorias");
    boton.setAttribute("onclick",` UpdateCategoria('${id }')`);

    
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);
        
    var requestOptions = {

    method: 'GET',

    headers: myHeaders,
    
    redirect: 'follow'

    };
    
    fetch(`https://labinfsoft.herokuapp.com/api/categorias/${ id }`, requestOptions)

    .then( response  => { 
        if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
        return response.json();
    }) 
    .then( resolve => {
        document.getElementById("inputUpdateNameCategoria").value = resolve[0].nombre;
        
    }) 
    .catch(error => console.log(error));
   
}

function changeBackground2(item) {
    
    var padre = item.parentNode.parentNode;
    var boton = document.getElementById("boton-delete-all-categorias");

    if (padre.classList.contains('fila-transparent')) padre.classList.replace("fila-transparent", "fila-color");
    else  padre.classList.replace("fila-color", "fila-transparent");
    
    if($("input:checkbox[name=checkboxCategoria]:checked").length > 0) boton.style.display = "block";
    else boton.style.display = "none";
}