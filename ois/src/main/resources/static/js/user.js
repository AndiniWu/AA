function getMySuperior(){
    $("#title1").html('<b class="bold1">M</b>Y<b class="bold1">&nbsp;S</b>UPERIOR');
    $("#userList").empty();// Clear whatever content there was before
    $("th.action1, .sort").remove();
    $("#userList").append(
        $("<tr>").append(
            $("<td>").text(mySup.picture),
            $("<td>").text(mySup.id),
            $("<td>").text(mySup.email),
            $("<td>").text(mySup.nik),
            $("<td>").text(mySup.name),
            $("<td>").text(mySup.division),
            $("<td>").text(mySup.position),
            $("<td>").text(mySup.cnumber),
            $("<td>").text(mySup.address),
            $("<td>").text("")
        ),
    )
}

function agetUserById(id){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/users/${id}`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data); // meng isi input field dengan value yg sdh ada
            $('#id').val(data.id);
            $("#nik").val(parseInt(data.nik));
            $('#name').val(data.name);
            $('#email').val(data.email);
            $('#password').val(data.password);
            $('#division').val(data.division);
            $('#position').val(data.position);
            $('#cnumber').val(parseInt(data.cnumber));
            $('#address').val(data.address);
            if(data.role==2){
                $('#emp').prop('checked',true);
                if(data.superior!=null) {
                    $('#superiorList').val(data.superior.id);
                }
            }},
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}

function agetAllUsersBySuperior(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/users?sId=${myId}&sortBy=${$('#sortBy').val()}&orderBy=${$('#orderBy').val()}`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json",
        success: function (data) {
            console.log("yes. data: " + data);
            if (!data || !data.length) return;
            $("#userList").empty();// Clear whatever content there was before
            var len = data.length;
            $("th.action1").remove();
            for (var i = 0; i < len; i++) {
                var user = data[i]; // Use a local variable to avoid repetition
                if (!user) continue;
                console.log(user);
                // Use jQuery methods to add the content and bind a click handler
                $("#userList").append(
                    $("<tr>").append(
                        $("<td>").text(user.id),
                        $("<td>").text(user.email),
                        $("<td>").text(user.nik),
                        $("<td>").text(user.name),
                        $("<td>").text(user.division),
                        $("<td>").text(user.position),
                        $("<td>").text(user.cnumber),
                        $("<td>").text(user.address),
                        $("<td>").text(user.superior.name)
                        ),
                    )
                }
            },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}

function agetAllUsers(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/users?sortBy=${$('#sortBy').val()}&orderBy=${$('#orderBy').val()}`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data);
            if (data) {
                var len = data.length;
                var txt = ``;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                            txt += `<tr>\n 
                                            <td id=${data[i].id}>${data[i].id}</td>\n 
                                            <td id=${data[i].email}>${data[i].email}</td>\n 
                                            <td style="width: 6%">${data[i].nik != null ? data[i].nik : ""}</td>\n 
                                            <td>${data[i].name}</td>\n 
                                            <td>${data[i].division != null ? data[i].division : ""}</td>\n 
                                            <td>${data[i].position != null ? data[i].position : ""}</td>\n 
                                            <td>${data[i].cnumber  != null ? data[i].cnumber : ""}</td>\n 
                                            <td><div style="width:100%;word-break: break-all">${data[i].address != null ? data[i].address : ""}</div></td>\n 
                                            <td>${data[i].superior != null ? data[i].superior.name : "" }</td>\n 
                                            <td align="center"  class="action1">\n 
                                            <button onclick="editUser(${data[i].id})" class="btn btn-warning">Edit&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                            <button onclick="deleteUser(${data[i].id},'${data[i].email}')" class="btn btn-danger">Delete</button></>\n 
                                            </td>\n
                                            </tr>`;
                    }
                    if(txt){
                        $("#userList").html(txt);
                    }
                    // alert("Success :"+data);
                    console.log(data);
                }
            }
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}

function agetAllSuperiors() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/superiors',
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json",
        success: function (data) {
            console.log("yes. data: " + data);
            if (data) {
                var len = data.length;
                var txt = "";
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        if (data[i].name && data[i].email) {
                            txt += `<option value=${data[i].id}>${data[i].email}</option>`
                        }
                    }
                    if (txt != "") {
                        $("#superiorList").append(txt);
                    }
                    // alert("Success :"+data);
                }
            }
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}

function aaddUser(type){
    var user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        role: document.querySelector('input[name="optradio"]:checked').value,
        nik: document.getElementById("nik").value,
        division: document.getElementById("division").value,
        position: document.getElementById("position").value,
        cnumber: document.getElementById("cnumber").value,
        address: document.getElementById("address").value
    };
    if($('#superiorList').val()!=""){user.superior = {id : parseInt($('#superiorList').val())}}
    var userJson = JSON.stringify(user);
    console.log(userJson);
    if(type ==="POST") {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/users',
            data: userJson,
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            dataType: "json", //to parse string into JSON object,
            success: function (data) {
                var msg="";
                if (data == false) {
                    msg += "There is already a user registered with the email provided"
                }
                else {
                    msg += "Successed to SAVE user";
                }
                console.log(msg);
                alert(`Result : \n\n ${msg}`);
                // $(".form1").reset(); error
            },
            error: function (error) {
                console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
                alert(`Error: ${error.status}\n\nPlease fill in the *`);
            }
        });
    }
    else if (type==="PUT"){
        var id=$('#id').val();
        console.log(`http://localhost:8080/api/users/${id}`);
        $.ajax({
            type: 'PUT',
            url: `http://localhost:8080/api/users/${id}`,
            data: userJson,
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            dataType: "json", //to parse string into JSON object,
            success: function (data) {
               if(data){
                   console.log("User updated : sucess");
                   alert("Successed to update user")
               }
            },
            error: function (error) {
                console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
                alert(`Error: ${error.status}\n\nPlease fill in the *`);
            }
        });
    }
}

function checkUserRequest(userId){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/requests?eId=`+userId,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {      // FROM TRINCOT STACKOVERFLOW
            console.log("yes. data: " + data);
            if (data.length!=0) {
                var msg="";
                for(var i =0; i< data.length;i++){
                    msg+=data[i].id+", ";
                }
                alert(`Failed to delete User (id: ${userId})\nThis User still haven't returned their requested item(s) (requestId: ${msg})`);
            }
            else{
                adeleteUser(userId);
            }

        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}


function adeleteUser(id){
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/api/users/delete/${id}`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json", //to parse string into JSON object,
        success: function (data) {
            if(data==true){
                console.log(`Successed to delete user with id: ${id}`);
                $(`#${id}`).parent().remove();
                alert("Successed to delete user");
            }
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
            alert(`Error: ${error.status}\n\nFailed to delete user with id : ${id}`);
        }
    });
}
