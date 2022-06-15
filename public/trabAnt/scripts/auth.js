function auth(e){
    e.preventDefault();
    e.stopPropagation();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var correo = document.getElementById("inputEmail").value;
    var passwd = document.getElementById("inputPassword").value;

    var raw = JSON.stringify({
    "correo": correo,
    "password": passwd 
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://labinfsoft.herokuapp.com/api/auth/login", requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result.hasOwnProperty('msg')) {
            document.getElementById("alert").classList.replace("alert-none", "alert-block");
            document.getElementById("inputEmail").value = "";
            document.getElementById("inputPassword").value ="";
        }
        else {
            if (result.usuario.rol == "ADMIN_ROLE") {
                sessionStorage.setItem("tokenAdmin", result.token)
                window.location.href="CRUD.html";
            }
            else {
                sessionStorage.setItem("tokenUser", result.token)
                window.location.href="videos.html";
            }

        } 
    })
    .catch(error => console.log(error));

    return false;
}
  