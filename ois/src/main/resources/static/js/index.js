var user = getCookie("user");
user = user.split(',');
document.getElementById("profile").innerText = user[2];

var isi= document.getElementById("isi")
$('#logout').click(function(e){
    e.preventDefault();
    deleteCookie("user");
    window.location = "login";
});

$('#addUser').click(function(e){
    e.preventDefault();

    isi.innerHTML=addUser(); //mengubah isi konten dengan halaman adduser
    agetAllSuperiors();
    $('input:radio').click(function() {
        $("#superiorList").prop("disabled",true);
        if($(this).hasClass('enable_d')) {
            $("#superiorList").prop("disabled",false);
        }
    });
    $("#register").click(function () {
        aaddUser("POST")
    });
});

function editUser(userId){
    isi.innerHTML=addUser();
    $('#title').html("<b class=\"bold1\">A</b>DD<b class=\"bold1\">U</b>SER</span>");
    agetAllSuperiors();
    agetUserById(userId);
    $("#register").click(function () {
        aaddUser("PUT")
    });
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





