function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie(cname) {
    var userId = getCookie(cname);
    if (userId != "") {
        console.log("Welcome again " + email);
    // } else {
    //     email = document.getElementById("email").value;
    //     if (email != "" && email != null) {
    //         setCookie("email", email, 1);
    //     }
    }
}

function deleteCookie(cname){
    document.cookie = cname + " = deleted; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
}