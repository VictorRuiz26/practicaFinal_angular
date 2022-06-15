/**
 * En este fichero están todas las funciones del CRUD de usuarios (GET, POST, DELETE, PATCH, UPDATE)
 */

var token = sessionStorage.getItem("tokenAdmin");
const usuariosPagina = 11;


$( document ).ready(function() {

    let tab = obtenerParametroURL('tab');
    if (tab) {
        $(`[data-bs-target=#${tab}]`).tab("show");
        $(`[data-bs-target=#${tab}]`).trigger("click");
    }

    $("#addUser-form").submit(
        function(){
            pepe(name,mail,passwd);
        },
        false
    );
    $("#addUserModal").submit(
        function(){
            pepe(name,mail,passwd);
        },
        false
    );

});


function cerrarSesion() {
    sessionStorage.clear()
    // sessionStorage.removeItem('tokenUser');
    window.location.href="login.html";
}



function pepe(idName,idMail,idPasswd) {


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");


        var name = document.getElementById(idName).value;
        var mail = document.getElementById(idMail).value;
        var passwd = document.getElementById(idPasswd).value;

        var raw = JSON.stringify({
        "nombre": name,
        "correo": mail,
        "password": passwd
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://labinfsoft.herokuapp.com/api/usuarios", requestOptions)
        .then(response => response.json())
        .then(result => {
            getUsers();
            document.getElementById(idName).value = "";
            document.getElementById(idMail).value = "";
            document.getElementById(idPasswd).value = "";
        })
        .catch(error => console.log('error', error));
}


function obtenerParametroURL(parametro) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var anuncioParam = urlParams.get(parametro);
    return anuncioParam;
}


function getUsers() {

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


    fetch(`https://labinfsoft.herokuapp.com/api/usuarios?limite=${limite}&desde=${desde}`, requestOptions)

    .then( response  => {
        if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
        return response.json();
    })

    .then(result => {
            var panel = document.getElementById("panel-body-user");
            panel.innerHTML = "";
            const array = result.usuarios;
            for(let i = 0; i <array.length; i++){
                let node = document.createElement("div");
                node.classList.add("fila", "fila-transparent");
                node.innerHTML = `<div class="checkbox-container">
                                        <input type="checkbox" name="checkbox" onclick="changeBackground(this)" value="${ array[i].uid }" id="${ array[i].uid }">
                                        <label for="${ array[i].uid }" class="checkbox">
                                            <div class="checkbox__inner">
                                                <div class="green__ball"></div>
                                            </div>
                                        </label>
                                    </div>
                                    <span class="uid-span"> ${ array[i].uid }</span>
                                    <span class="nombre-span"> ${ array[i].nombre } </span>
                                    <span class="correo-span"> ${ array[i].correo }</span>
                                    <span class="opciones-span" style="font-size: 1.25em;"> <i type="button" data-toggle="modal" data-target="#myModal" onclick="prueba('${ array[i].uid }')" class="fa fa-pencil"></i> <i  type="button" data-toggle="modal" data-target="#myModal3" onclick="viewUser('${ array[i].uid }')" class="fa fa-eye view-icon"></i> <i onclick="deleteUser('${ array[i].uid }')" type="button" class="fa fa-times"></i></span>`;
                panel.appendChild(node);
            }
            // alert(result.total);
            paginar(paginaActual, result.total);
    })

.catch(error => { window.location.href="login.html"; });

}

function viewUser(id) {

            var myHeaders = new Headers();

            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {

            method: 'GET',

            headers: myHeaders,

            redirect: 'follow'

            };

            fetch(`https://labinfsoft.herokuapp.com/api/usuarios/${ id }`, requestOptions)

            .then( response  => {
                if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
                return response.json();
            })
            .then( resolve => {
                console.log(resolve[0]);
                document.getElementById("viewName").innerHTML = resolve[0].nombre;
                document.getElementById("viewEmail").innerHTML = resolve[0].correo;
                document.getElementById("viewUID").innerHTML = resolve[0].uid;
                // $('#myModal').modal('show');

            })
            .catch(error => console.log(error));

}



function updateUser(id) {

    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    myHeaders.append("Content-Type", "application/json");

    var nombre_value = document.getElementById("inputUpdateName").value;
    var email_value = document.getElementById("inputUpdateEmail").value;

    //alert(email_value);

    var raw_string = JSON.stringify({
        "nombre": nombre_value,
        "correo": email_value
    });

    var requestOptions = {

    method: 'PUT',

    headers: myHeaders,

    body: raw_string,

    redirect: 'follow'

    };

    //$("#form-update")[0].reportValidity();

    fetch("https://labinfsoft.herokuapp.com/api/usuarios/" + id, requestOptions)

    .then(response => response.text())

    .then(result => {
        getUsers();
    })

    .catch(error => console.log('error', error));

}


function prueba(id) {


    let boton = document.getElementById("saveChanges");
    boton.setAttribute("onclick",` updateUser('${ id }')`);


    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {

    method: 'GET',

    headers: myHeaders,

    redirect: 'follow'

    };

    fetch(`https://labinfsoft.herokuapp.com/api/usuarios/${ id }`, requestOptions)

    .then( response  => {
        if(Math.floor(response.status/100) != 2) throw new Error("Usuario no permitido");
        return response.json();
    })
    .then( resolve => {
        console.log(resolve[0]);
        document.getElementById("inputUpdateName").value = resolve[0].nombre;
        document.getElementById("inputUpdateEmail").value = resolve[0].correo;

    })
    .catch(error => console.log(error));

}


function deleteUser(id) {


    let ok = window.confirm("¿Estás seguro de que deseas eliminar al usuario?");

    if (ok) {
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {

        method: 'DELETE',

        headers: myHeaders,

        redirect: 'follow'

        };


        fetch("https://labinfsoft.herokuapp.com/api/usuarios/" + id, requestOptions)

        .then(response => response.text())

        .then(result => getUsers())

        .catch(error => console.log('error', error));
    }
}

function paginar(paginaActual, resultTotal) {
    let contenedor = document.getElementById("pagination");
    contenedor.innerHTML = "";
    totalPaginas = Math.floor(resultTotal/usuariosPagina)+1;
    for (var i = 1; i  < totalPaginas+1; i++) {
        let seleccionado = "";
        if (i==paginaActual) seleccionado = "boton-resaltado"; 
        let boton = `<li class="page-item ${seleccionado}"><a class="page-link" href="CRUD.html?pagina=${i}">${i}</a></li>`;
        contenedor.innerHTML += boton;
    }
}


function deleteAllUsers() {

    let ok = window.confirm("¿Estás seguro de que deseas eliminar a los usuarios seleccionados?");

    if (ok) {
        $("input:checkbox[name=checkbox]:checked").each(function() {

            let id = $( this ).val();

            var myHeaders = new Headers();

            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {

            method: 'DELETE',

            headers: myHeaders,

            redirect: 'follow'

            };


            fetch("https://labinfsoft.herokuapp.com/api/usuarios/" + id, requestOptions)

            .then(response => response.text())

            .then(result => {document.getElementById("boton-delete-all").style.display = "none"; getUsers() })

            .catch(error => console.log('error', error));


        })
    }
}


function changeBackground(item) {

        var padre = item.parentNode.parentNode;
        var boton = document.getElementById("boton-delete-all");

        if (padre.classList.contains('fila-transparent')) padre.classList.replace("fila-transparent", "fila-color");
        else  padre.classList.replace("fila-color", "fila-transparent");

        if($("input:checkbox[name=checkbox]:checked").length > 0) boton.style.display = "block";
        else boton.style.display = "none";
    }




    //const jwt_decode = require('jwt-decode'); //Documentacion: https://github.com/auth0/jwt-decode

    // function checkToken() {
    //     if (sessionStorage.getItem("tokenAdmin") === null) {
    //         window.location.href="login.php";
    //     }
    //     this.token = sessionStorage.getItem("tokenAdmin");
    //     //const decodedToken = jwt_decode(token);  // PARA COMPROBAR CADUCIDAD-> he pensado mejor recuperar token directamente (sea o no null), y llamar a funcion checkToken que lleve a getUsers o a login.php
    //     getUsers();
    // }
