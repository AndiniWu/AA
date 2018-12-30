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
    var cookie = getCookie(cname);
    console.log(cookie);
    if (cookie != "") {
        console.log("Welcome again " + myEmail);
        if(myRole!=0){
            $("#addUser").remove();
            $("#addItem").remove();
            if(myRole==2) $("#getAllRequests").remove();
        }

    } else {
       alert("Please Login again");
       window.location="login";
    }
}1

function deleteCookie(cname){
    document.cookie = cname + " = deleted; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
}