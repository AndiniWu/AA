
// $(document).ready(function() {

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
            if (data!=null) {
                msg += "Login succeed";
                var cvalue = [data.id,data.email,data.name,data.role];
                setCookie("user",cvalue,1);
                console.log("cookies saved :\n" + getCookie("user"));
                // window.location.replace("index");
                window.location = "index";
                // document.location= "/index";
            } else{
                msg += "Wrong Username/password";
                console.log("cookies not saved");
        }
        console.log(msg);
        },
        error: function (error) {
            console.log("cookie not saved");
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
});

