var user = getCookie("user");
user = user.split(',');
document.getElementById("profile").innerText = user[2];


var isi= document.getElementById("isi")
$('#logout').click(function(e){
    e.preventDefault();
    deleteCookie("user");
    window.location = "login";
});

function editUser(userId){
    isi.innerHTML=addUser();
    getUserbyId(userId);
};
function deleteUser(userId){

};


$('#getAllUsers').click(function(e){
    e.preventDefault();
    isi.innerHTML=getAllUsers();
    agetAllUsers();

    $("#myInput").on("keyup", function() {  //fungsi ini didapat dari w3schools
        var value = $(this).val().toLowerCase();
        $("#userList tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

$('#addUser').click(function(e){
    e.preventDefault();
    // $( document ).ready(function() {
    //     console.log( "ready!" );
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

    isi.innerHTML=addUser(); //mengubah isi konten dengan halaman adduser
    $('input:radio').click(function() {
        $("#superiorList").prop("disabled",true);
        if($(this).hasClass('enable_d')) {
            $("#superiorList").prop("disabled",false);
        }
    });
    $("#register").click(function () {
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
    });

});




