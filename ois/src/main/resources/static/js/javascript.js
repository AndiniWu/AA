
    $("#login").click(function () {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        console.log('{"email": "' + email + '", "email": "' + password + '"}');
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
                if (data === false) {
                    msg += "Wrong Username/password "
                }
                else {
                    msg += "Login succeed"
                    window.location.href = 'http://localhost:8080/index'
                }
                console.log(msg);
            },
            error: function (error) {
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
        if(superior){
            txt = '{"name": "' + name + '", "email": "' + email + '", "password": "' + password + '", "role": ' + role + ', "superior": { "id" : '+superior+'}}'
        }
        console.log('{"name": "' + name + '", "email": "' + email + '", "email": "' + password + '", "role": ' + role + ', "superior": { "id" : '+superior+'}}');
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

