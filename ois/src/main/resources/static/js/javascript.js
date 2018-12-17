
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
function checkCookie() {
    var email = getCookie("userId");
    alert(email);
    if (email != "") {
        alert("Welcome again " + email);
    } else {
        email = document.getElementById("email").value;
        if (email != "" && email != null) {
            setCookie("email", email, 365);
        }
    }
}


$("#login").click(function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log('{"email": "' + email + '", "password": "' + password + '"}');
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/login',
        data:
            '{"email": "' + email + '", "password": "' + password + '"}',
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json", //to parse string into JSON object,
        success: function (data) {
            var msg = "Call Success. result: ";
            if (data === 0) {
                msg += "Wrong Username/password";
                console.log("cookies not saved");
            }
            else {
                msg += "Login succeed";
                setCookie("userId", data, 1);
                console.log(getCookie("userId"),"cookies saved");
                // window.location.href = 'http://localhost:8080/index';
            }
            console.log(msg);
        },
        error: function (error) {
            console.log("cookie not saved");
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
});

$("#register").click(function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    var role = document.querySelector('input[name="optradio"]:checked').value;
    var superior = document.getElementById("superiorList").value;
    var txt = '{"name": "' + name + '", "email": "' + email + '", "password": "' + password + '", "role": ' + role + '}'
    if(superior!=""){
        txt = '{"name": "' + name + '", "email": "' + email + '", "password": "' + password + '", "role": ' + role + ', "superior": { "id" : '+superior+'}}'
    }
    console.log('{"name": "' + name + '", "email": "' + email + '", "password": "' + password + '", "role": ' + role + ', "superior": { "id" : '+superior+'}}');
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/users',
        data:
            txt,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json", //to parse string into JSON object,
        success: function (data) {
            var msg = "Call Success. result: ";
            if (data === false) {
                msg += "There is already a user registered with the email provided"
            }
            else {
                msg += "Successed to save user"
            }
            console.log(msg);
            //alert("Success :"+data)
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
});

