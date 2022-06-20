

$( document ).ready(function() {
    $("#addVideo-form").submit(
        function(){
            addVideo(name,url,cat);
        },
        false
    );
    $("#addVideoModal").submit(
        function(){
            addVideo(name);
        },
        false
    );
});

function getVideos() {

    /**
     * Aqui hacemos peticion de categorías para rellenar la lista de options de las categorías disponibles.
     */

        let select = document.getElementById("nombreCategoría");
        select.classList.add("form-select");
        select.innerHTML = "";

        let select2 = document.getElementById("inputAddVideoCatModal");
        select2.classList.add("form-select");
        select2.innerHTML = "";

        let select3 = document.getElementById("updateVideoModal");
        select3.classList.add("form-select");
        select3.innerHTML = "";



       
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);
        
        var requestOptions = {

        method: 'GET',

        headers: myHeaders,
        
        redirect: 'follow'

        };

        

        fetch(`https://labinfsoft.herokuapp.com/api/categorias?limite=200`, requestOptions)

        .then( response  => { 
            if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
            return response.json();
        })

        .then(result => {
            result.categorias.forEach( (cat, index) => {
                let option = document.createElement("option");
                let option2 = document.createElement("option");
                let option3 = document.createElement("option");

                option.text = cat.nombre;
                option.value = cat._id;
                option2.text = cat.nombre;
                option2.value = cat._id;
                option3.text = cat.nombre;
                option3.value = cat._id;

                select.add(option, select[index]);
                select2.add(option2, select2[index]);
                select3.add(option3, select3[index]);
            });


        })
        .catch(error => {console.log(error); });


        /**
         * GET_VIDEOS
         */

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
 
         fetch(`https://labinfsoft.herokuapp.com/api/videos?limite=${limite}&desde=${desde}`, requestOptions)
 
         .then( response  => { 
             if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
             return response.json();
         })
 
         .then(result => {
            var panel = document.getElementById("panel-body-videos");
            panel.innerHTML = "";
            const array = result.productos;
            for(let i = 0; i <array.length; i++){
                let node = document.createElement("div");
                node.classList.add("fila", "fila-transparent");
                node.innerHTML = `<div class="checkbox-container">
                                        <input type="checkbox" name="checkboxVideo" onclick="changeBackground3(this)" value="${ array[i]._id }" id="${ array[i]._id }">
                                        <label for="${ array[i]._id }" class="checkbox">
                                            <div class="checkbox__inner">
                                                <div class="green__ball"></div>
                                            </div>
                                        </label>
                                    </div>
                                    <span class="uid-span"> ${ array[i]._id }</span>
                                    <span class="nombre-span"> <a href="${ array[i].url }" target="_blank"> ${ array[i].nombre }</a> </span>
                                    <span class="categoria-span"> ${ array[i].categoria.nombre } </span>
                                    <span class="opciones-span" style="font-size: 1.25em;"> <i type="button" data-toggle="modal" data-target="#myModal8" onclick="prueba3('${ array[i]._id }')" class="fa fa-pencil"></i> <i  type="button" data-toggle="modal" data-target="#myModal9" onclick="viewVideo('${ array[i]._id }')" class="fa fa-eye view-icon"></i> <i onclick="deleteVideo('${ array[i]._id }')" type="button" class="fa fa-times"></i></span>`;
                panel.appendChild(node);
            }
            paginarVideos(paginaActual, result.total);  
         })
         .catch(error => { window.location.href="index.html"; });

}


function addVideo(idName,idURL,idCat) {

    // El idCat es el id del select, que tendrá su option seleccionado.
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");


    var name = document.getElementById(idName).value;
    var select_cat = document.getElementById(idCat).value;
    var url = document.getElementById(idURL).value;
    var url_iframe = url.replace("watch?v=", "embed/");
    
    var raw = JSON.stringify({
    "nombre": name,
    "url": url_iframe,
    "categoria": select_cat
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://labinfsoft.herokuapp.com/api/videos", requestOptions)
    .then(response => response.json())
    .then(result => {
        getVideos();
        document.getElementById(idName).value = "";
        document.getElementById(idCat).value = "";
        document.getElementById(idURL).value = "";
    })
    .catch(error => console.log('error', error));
}

function prueba3(id){

    let boton = document.getElementById("saveChangesVideo");
    boton.setAttribute("onclick",` UpdateVideo('${id }')`);

    
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);
        
    var requestOptions = {

    method: 'GET',

    headers: myHeaders,
    
    redirect: 'follow'

    };
    
    fetch(`https://labinfsoft.herokuapp.com/api/videos/${ id }`, requestOptions)

    .then( response  => { 
        if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
        return response.json();
    }) 
    .then( resolve => {
        document.getElementById("inputUpdateNameVideo").value = resolve[0].nombre;
        document.getElementById("inputUpdateURLVideo").value = resolve[0].url;
        document.getElementById("updateVideoModal").value = resolve[0].categoria._id;
        document.getElementById("updateVideoModal").text = resolve[0].categoria.nombre;
        
    }) 
    .catch(error => console.log(error));
 
}

function UpdateVideo(id) {

    
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    myHeaders.append("Content-Type", "application/json");

    var nombre_value = document.getElementById("inputUpdateNameVideo").value;
    var url_value = document.getElementById("inputUpdateURLVideo").value;
    var cat_id = document.getElementById("updateVideoModal").value;
    
    var raw_string = JSON.stringify({
        "nombre": nombre_value,
        "url": url_value,
        "categoria": cat_id
    });

    var requestOptions = {

    method: 'PUT',

    headers: myHeaders,

    body: raw_string,

    redirect: 'follow'

    };

    //$("#form-update")[0].reportValidity();

    fetch("https://labinfsoft.herokuapp.com/api/videos/" + id, requestOptions)

    .then(response => response.text())

    .then(result => {
        getVideos();
    })

    .catch(error => console.log('error', error));
}

function viewVideo(id){

    let boton = document.getElementById("saveChangesVideo");
    
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);
        
    var requestOptions = {

    method: 'GET',

    headers: myHeaders,
    
    redirect: 'follow'

    };
    
    fetch(`https://labinfsoft.herokuapp.com/api/videos/${ id }`, requestOptions)

    .then( response  => { 
        if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
        return response.json();
    }) 
    .then( resolve => {
        document.getElementById("viewNameVideo").innerHTML = resolve[0].nombre;
        document.getElementById("viewURLVideo").innerHTML = resolve[0].url;
        document.getElementById("viewCatVideo").innerHTML = resolve[0].categoria.nombre;
        
    }) 
    .catch(error => console.log(error));
 
}

function deleteVideo(id) {

        let ok = window.confirm("¿Estás seguro de que deseas eliminar el video?");

        if (ok) {

            var myHeaders = new Headers();

            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {

            method: 'DELETE',

            headers: myHeaders,

            redirect: 'follow'

            };


            fetch("https://labinfsoft.herokuapp.com/api/videos/" + id, requestOptions)

            .then(response => response.text())

            .then(result => getVideos())

            .catch(error => console.log('error', error));
    }
}


function deleteAllVideos() {

    let ok = window.confirm("¿Estás seguro de que deseas eliminar los videos seleccionados?");

    if (ok) {
        $("input:checkbox[name=checkboxVideo]:checked").each(function() {
            
            let id = $( this ).val();
            var myHeaders = new Headers();

            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {

            method: 'DELETE',

            headers: myHeaders,

            redirect: 'follow'

            };


            fetch("https://labinfsoft.herokuapp.com/api/videos/" + id, requestOptions)

            .then(response => response.text())

            .then(result => {document.getElementById("boton-delete-all-videos").style.display = "none"; getVideos() })

            .catch(error => console.log('error', error));


        })
    }
}

function paginarVideos(paginaActual, resultTotal) {
    let contenedor = document.getElementById("paginationVideos");
    contenedor.innerHTML = "";
    totalPaginas = Math.floor(resultTotal/usuariosPagina) + 1;
    for (var i = 1; i  < totalPaginas+1; i++) {
        let seleccionado = "";
        if (i==paginaActual) seleccionado = "boton-resaltado"; 
        let boton = `<li class="page-item ${seleccionado}"><a id="boton${i}" class="page-link" href="CRUD.html?pagina=${i}&tab=videos">${i}</a></li>`;
        contenedor.innerHTML += boton;
    }
}

function changeBackground3(item) {
    
    var padre = item.parentNode.parentNode;
    var boton = document.getElementById("boton-delete-all-videos");

    if (padre.classList.contains('fila-transparent')) padre.classList.replace("fila-transparent", "fila-color");
    else  padre.classList.replace("fila-color", "fila-transparent");
    
    if($("input:checkbox[name=checkboxVideo]:checked").length > 0) boton.style.display = "block";
    else boton.style.display = "none";
} 
// function getCatSelect(){

//         let select = document.getElementById("inputAddVideoCatModal");
//         select.classList.add("form-select");
//         select.innerHTML = "";

       
//         var myHeaders = new Headers();

//         myHeaders.append("Authorization", "Bearer " + token);
        
//         var requestOptions = {

//         method: 'GET',

//         headers: myHeaders,
        
//         redirect: 'follow'

//         };

//         fetch(`https://labinfsoft.herokuapp.com/api/categorias`, requestOptions)

//         .then( response  => { 
//             if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
//             return response.json();
//         })

//         .then(result => {
//             result.categorias.forEach( (cat, index) => {
//                 let option = document.createElement("option");
//                 option.text = cat.nombre;
//                 option.value = cat._id;
//                 select.add(option, select[index]);
//             });


//         })
//         .catch(error => console.log(error));
// }


