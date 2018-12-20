function agetUserById(id){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/'+id,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data)
            $("#nik").val(parseInt(data.nik));
            $('#name').val(data.name);
            $('#email').val(data.email);
            $('#password').val(data.password);
            $('#division').val(data.division);
            $('#position').val(data.position);
            $('#cnumber').val(parseInt(data.cnumber));
            $('#address').val(data.address);
            if(data.role==1){$('input[name="optradio"]')[0].prop('checked',true)}
            if(data.superior!=null){
            $('#superiorList').val(data.superior.email);}
            agetAllSuperiors();
            },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}


function agetAllUsers(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users',
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data)
            if (data) {
                var len = data.length;
                var txt = ``;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        if(data[i].superior!=null) {
                            txt += `<tr>\n 
                                          \t\t\t\t<td id=${data[i].id}>${data[i].id}</td>\n 
                                            \t\t\t\t<td id=${data[i].email}>${data[i].email}</td>\n 
                                            \t\t\t\t<td>${data[i].nik}</td>\n 
                                            \t\t\t\t<td>${data[i].name}</td>\n 
                                            \t\t\t\t<td>${data[i].division}</td>\n 
                                            \t\t\t\t<td>${data[i].position}</td>\n 
                                            \t\t\t\t<td>${data[i].cnumber}</td>\n 
                                            \t\t\t\t<td>${data[i].address}</td>\n 
                                            \t\t\t\t<td>${data[i].superior.name}</td>\n 
                                            \t\t\t\t<td>${data[i].picture}</td>\n 
                                            \t\t\t\t<td class="action1">\n 
                                            \t\t\t\t\t<button onclick="editUser(${data[i].id})" class="btn btn-warning">Edit&nbsp;&nbsp;&nbsp;&nbsp;</button>\n
                                            \t\t\t\t\t<button onclick="deleteUser(${data[i].id})" class="btn btn-danger">Delete</button>\n 
                                            \t\t\t\t</td>\n
                                            \t\t\t</tr>`;
                        }
                        else if(data[i].superior==null){
                            txt += `<tr>\n
                                          \t\t\t\t<td id=${data[i].id}>${data[i].id}</td>\n 
                                            \t\t\t\t<td id=${data[i].email}>${data[i].email}</td>\n 
                                            \t\t\t\t<td>${data[i].nik}</td>\n
                                            \t\t\t\t<td>${data[i].name}</td>\n
                                            \t\t\t\t<td>${data[i].division}</td>\n
                                            \t\t\t\t<td>${data[i].position}</td>\n
                                            \t\t\t\t<td>${data[i].cnumber}</td>\n
                                            \t\t\t\t<td>${data[i].address}</td>\n
                                            \t\t\t\t<td></td>\n
                                            \t\t\t\t<td>${data[i].picture}</td>\n
                                            \t\t\t\t<td class="action1">\n
                                            \t\t\t\t\t<button onclick="editUser(${data[i].id})" class="btn btn-warning">Edit&nbsp;&nbsp;&nbsp;&nbsp;</button>\n
                                            \t\t\t\t\t<button onclick="deleteUser(${data[i].id})" class="btn btn-danger">Delete</button>\n
                                            \t\t\t\t</td>\n
                                            \t\t\t</tr>`;
                        }
                    }
                    if(txt){
                        $("#userList").append(txt);
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

function agetAllSuperiors(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/superiors',
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data)
            if (data) {
                var len = data.length;
                var txt = "";
                if (len > 0) {
                    for(var i=0;i<len;i++){
                        if(data[i].name && data[i].email){
                            txt += '<option value='+data[i].id+'>'+data[i].email+'</option>'
                        }
                    }
                    if(txt != ""){
                        $("#superiorList").append(txt);
                    }
                    alert("Success :"+data);
                }
            }
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}

function aaddUser(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    var role = document.querySelector('input[name="optradio"]:checked').value;
    var superior = document.getElementById("superiorList").value;
    var nik = document.getElementById("nik").value;
    var division= document.getElementById("division").value;
    var position = document.getElementById("position").value;
    var cnumber = document.getElementById("cnumber").value;
    var address = document.getElementById("address").value;

    var txt = '{"name": "' + name + '", "email": "' + email + '", "password": "' + password + '", "role": ' + role + ', "nik": "' + nik + '", "division": "' + division + '", "position": "' + position + '", "cnumber": "' + cnumber + '", "address": "' + address + '"}';
    if(superior!=""){
        txt = '{"name": "' + name + '", "email": "' + email + '", "password": "' + password + '", "role": ' + role +', "nik": "' + nik + '", "division": "' + division + '", "position": "' + position + '", "cnumber": "' + cnumber + '", "address": "' + address + '", "superior": { "id" : '+superior+'}}'
    }
    console.log(txt);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/users',
        data: txt,
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
                msg += "Successed to save user";
            }
            console.log(msg);
            //alert("Success :"+data)
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}