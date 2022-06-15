const jwt_decode = require('jwt-decode');
function decodeToken(  ){

    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjFkMWE5ODI0MDU3NWQzY2ZiZTU2ZGEiLCJpYXQiOjE2NDY3NTMyOTIsImV4cCI6MTY0Njc2NzY5Mn0.OTHto9ozuSESBZF4xhw166m7UbTI5m0vP0W7r7dML8g";
    return jwt_decode(token);

}


