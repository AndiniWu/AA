var user = getCookie("user");
user = user.split(',');
document.getElementById("profile").innerText = user[2];

var isi= document.getElementById("isi") //sebagai tempat pergantian konten halaman

$('#logout').click(function(e){
    e.preventDefault();
    deleteCookie("user");
    window.location = "login";
});

function superiorList(){
    $('input:radio[name="optradio"]').click(function() {
        $("#superiorList").prop("disabled",false);
        if($(this).hasClass('enable_d')) {
            $("#superiorList").val("");
            $("#superiorList").prop("disabled",true);
        }
    });
}

$('#addUser').click(function(e){
    e.preventDefault();

    isi.innerHTML=addUser(); //mengubah isi konten dengan halaman adduser
    agetAllSuperiors();
    superiorList();
    $("#register").click(function () {
        aaddUser("POST")
    });
});
$("#reset").click(function () {
    $(".form1").reset();
});

function editUser(userId){ //still working on
    isi.innerHTML=addUser();
    $('#title').html('<b class=\"bold1\">E</b>DIT<b class=\"bold1\">&nbsp;U</b>SER');
    agetUserById(userId);
    agetAllSuperiors();
    superiorList();
    $("#register").click(function () {
        aaddUser("PUT")
    });

};
function deleteUser(userId){
    var r = confirm("Are you sure?")
    if(r==true){
        adeleteUser(userId);
    }
};


$('#getAllUsers').click(function(e){
    e.preventDefault();
    isi.innerHTML=getAllUsers();
    agetAllUsers();
    $("#orderBy").change(function () {
        agetAllUsers();

    });

    $("#myInput").on("keyup", function() {  //fungsi search ini didapat dari w3schools
        var value = $(this).val().toLowerCase();
        $("#userList tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // $('#addNewUser').click(function(e){
    //     e.preventDefault();
    //
    //     isi.innerHTML=addUser(); //mengubah isi konten dengan halaman adduser
    //     agetAllSuperiors();
    //     superiorList();
    //     $("#register").click(function () {
    //         aaddUser("POST")
    //     });
    // });

});





