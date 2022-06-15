const jwt_decode = require('jwt-decode');
function decodeToken(){

    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjFkMWE5ODI0MDU3NWQzY2ZiZTU2ZGEiLCJpYXQiOjE2NDY3NTMyOTIsImV4cCI6MTY0Njc2NzY5Mn0.OTHto9ozuSESBZF4xhw166m7UbTI5m0vP0W7r7dML8g";
    var decoded = jwt_decode(token);
    //console.log(token);

    //console.log(decoded);
    return decoded;

    /* prints:
    * { 
    *   foo: "bar",
    *   exp: 1393286893,
    *   iat: 1393268893  
    * }
    */

    // decode header by passing in options (useful for when you need `kid` to verify a JWT):
    var decodedHeader = jwt_decode(token, { header: true });
    //console.log(decodedHeader);

    /* prints:
    * { 
    *   typ: "JWT",
    *   alg: "HS256" 
    * }
    */
    decoded.exp = 1646756461080;
    console.log('Fecha actual ', Date.now());
    console.log('Token expira en: ', decoded.exp);
    if (Date.now() >= decoded.exp * 1000 ) {
        console.log('TOKEN EXPIRADO');
      }
    //     const objeto = {
    //         msg:'No tiene permisos'
    //     }

    // if(!objeto.msg) console.log('El objeto si existe');

}
// decodeToken();

