var token = sessionStorage.getItem("tokenUser");

function getVideos() {
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

    fetch(`https://labinfsoft.herokuapp.com/api/videos/padre?limite=250`, requestOptions)

        .then(response => {
            if (Math.floor(response.status / 100) != 2) throw new Error("Usuario no permitido");
            return response.json();
        })

        .then(result => {
            let body = document.getElementById('cuerpo');
            let section;

            result.productos.forEach(video => {

                if (document.getElementById(video.categoria.nombre + "-contenedor")){
                    section = document.getElementById(video.categoria.nombre + "-contenedor");
                }
                else {
                   section = document.createElement("section");
                   section.setAttribute("id", video.categoria.nombre + "-contenedor")
                   section.innerHTML = `<h2> Categoria ${video.categoria.nombre} </h2>`;
                }
                
                    section.innerHTML += `<div class="video1" style="display: inline-block; margin-right: 20px;">
                        <iframe width="400" height="250" src="${video.url}" name="${video.nombre}" title="YouTube video player" frameborder="10" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                             </div>`;
                    //  <a href="${ video.url }" target="_blank">${ video.nombre } </a>
               
                body.appendChild(section);
            });
            

        })
        .catch(error => { window.location.href="login.html"; });

}

function cerrarSesion() {
    sessionStorage.clear()
    // sessionStorage.removeItem('tokenUser');
    window.location.href="login.html";
}