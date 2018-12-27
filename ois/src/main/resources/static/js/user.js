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


function agetAllUsers(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/users?orderBy=${$('#orderBy').val()}`,
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
                        if(data[i].superior!=null) {
                            txt += `<tr>\n 
                                          \t\t\t\t<td id=${data[i].id}>${data[i].id}</td>\n 
                                            \t\t\t\t<td id=${data[i].email}>${data[i].email}</td>\n 
                                            \t\t\t\t<td style="width: 6%">${data[i].nik}</td>\n 
                                            \t\t\t\t<td>${data[i].name}</td>\n 
                                            \t\t\t\t<td>${data[i].division}</td>\n 
                                            \t\t\t\t<td>${data[i].position}</td>\n 
                                            \t\t\t\t<td>${data[i].cnumber}</td>\n 
                                            \t\t\t\t<td><div style="width:100%;word-break: break-all">${data[i].address}</div></td>\n 
                                            \t\t\t\t<td>${data[i].superior.name}</td>\n 
                                            \t\t\t\t<td>${data[i].picture}</td>\n 
                                            \t\t\t\t<td align="center"  class="action1">\n 
                                            \t\t\t\t\t<button onclick="editUser(${data[i].id})" class="btn btn-warning">Edit&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                            \t\t\t\t\<button onclick="deleteUser(${data[i].id},'${data[i].email}')" class="btn btn-danger">Delete</button></>\n 
                                            \t\t\t\t</td>\n
                                            \t\t\t</tr>`;
                        }
                        else if(data[i].superior==null){
                            txt += `<tr>\n
                                          \t\t\t\t<td id=${data[i].id}>${data[i].id}</td>\n 
                                            \t\t\t\t<td id=${data[i].email}>${data[i].email}</td>\n 
                                            \t\t\t\t<td style="width: 6%">${data[i].nik}</td>\n
                                            \t\t\t\t<td>${data[i].name}</td>\n
                                            \t\t\t\t<td>${data[i].division}</td>\n
                                            \t\t\t\t<td>${data[i].position}</td>\n
                                            \t\t\t\t<td>${data[i].cnumber}</td>\n
                                            \t\t\t\t<td><div style="width:100%;word-break: break-all">${data[i].address}</div></td>\n 
                                            \t\t\t\t<td></td>\n
                                            \t\t\t\t<td>${data[i].picture}</td>\n
                                            \t\t\t\t<td align="center"  class="action1">\n
                                            \t\t\t\t\t<button onclick="editUser(${data[i].id})" class="btn btn-warning">Edit&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                            \t\t\t\t\t<button onclick="deleteUser(${data[i].id},'${data[i].email}')" class="btn btn-danger">Delete</button>\n
                                            \t\t\t\t</td>\n
                                            \t\t\t</tr>`;
                        }
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
                console.log("User DELETED : sucess");
                alert("Successed to delete user")
            }
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
            alert(`Error: ${error.status}\n\nFailed to delete user with id : ${id}`);
        }
    });
}
