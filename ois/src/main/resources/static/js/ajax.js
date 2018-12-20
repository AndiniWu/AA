function agetUserbyId(id){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/users/'+id,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data)
            $('#name').val(data.name);//terakhir sampai sini
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