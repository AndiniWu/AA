
var user = getCookie("user");
user = user.split(',');

var myId = user[0];
var myEmail = user[1];
var myRole = user[3];
checkCookie("user");
var sup = getCookie("superior");
var mySup;
if(sup) mySup=JSON.parse(sup);

console.log(user);
console.log(mySup);
var isi= $("#isi"); //sebagai tempat pergantian konten halaman
function refresh(ref){
    isi.html(ref());
}

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



$('#profile').text(user[2]);


$('.logout').click(function(e){
    e.preventDefault();
    deleteCookie("user");
    deleteCookie("superior");
    window.location = "login";
});

agetRecentUpdates(0);
agetItemCount();
agetRequestCount();
agetMyRequestCount();
// agetCurrentStock();agetTotalStock();



//===================================== T O P    B U T T O N =====================================

var btn = $('#button');

$(window).scroll(function() {
    if ($(window).scrollTop() > 200) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
});


//===================================== V A L I D A T I O N =====================================

function minMaxCheck(obj) { // user tetap bisa melakukan input ',' tpi ketika msk ke backend tetap akan diambil angka pertama saja
    var v = obj.value.replace(/\D/g, ''); //regex filter for integer only
    if (v > parseInt(obj.max)) {
        v = parseInt(obj.max)
    }
    else if (v < parseInt(obj.min)) {
        v = parseInt(obj.min)
    }
    else if (v > parseInt(obj.maxLength)) {
        v = v.slice(0, obj.maxLength);
    }
    obj.value = v;
}

//===================================== U S E R =====================================

function superiorList(){
    $('input:radio[name="optradio"]').click(function() {
        $("#superiorList").prop("disabled",false);
        if($(this).hasClass('enable_d')) {
            $("#superiorList").val("");
            $("#superiorList").prop("disabled",true);
        }
    });
}

$('.addUser').click(function(e){
    e.preventDefault();
    refresh(addUser);
    agetAllSuperiors();
    superiorList();
    $("#saveUser").click(function (e) {
        e.preventDefault();
        aaddUser("POST")
    });
});
$("#reset").click(function () {
    $(".form1").reset();
});

function editUser(userId){ // edit user by admin
    refresh(addUser);
    $('#title').html('<b class=\"bold1\">E</b>DIT<b class=\"bold1\">&nbsp;U</b>SER');
    agetUserById(userId);
    agetAllSuperiors();
    superiorList();
    $("#saveUser").click(function () {
        var r = confirm("Are you sure?");
        if(r==true){
            aaddUser("PUT");
        }
    });
}

$(".editProfile").click(function () { //edit user by user
    refresh(addUser);
    $("#title").html('<b class="bold1">E</b>DIT<b class="bold1">&nbsp;U</b>SER');
    if(mySup) $("#mySup").html(`<b class="bold1">M</b>YSUPERIOR:<b class="bold1">&nbsp;${mySup.email}</b>`);
    $(".rm").remove();
    $(".dis").prop("disabled",true);

    agetUserById(myId);

});

function deleteUser(userId,userName){
    var r = confirm(`You are going to delete user :\nId      : ${userId}\nemail : ${userName}\n\nAre you sure? `);
    if(r==true){
        checkUserRequest(userId);
        // adeleteUser(userId);//user tidak benar-benar di delete, melainkan hanya menganti value dari field enabled menjadi false.
        //ketika yang didelete adalah user dengan role superior(1), dan memiliki hubungan foreignkey ke user lain, maka tidak akan terjadi error dan id user ini tetap menjadi foreignkey di user lain, sehingga perlu dilakukan update manual dari user lain utk mengganti superior_id nya.
    }
}


$('.getAllUsers').click(function(e){
    e.preventDefault();
    refresh(getAllUsers);
    if(myRole==0) agetAllUsers();
    else if(myRole==1) {
        agetAllUsersBySuperior();
    }
    else if(myRole==2) {
        getMySuperior();
    }
    $("#orderBy, #sortBy").change(function () {
        if(myRole==0 ) agetAllUsers();
        else if(myRole==1) agetAllUsersBySuperior();
    });

    $("#myInput").on("keyup", function() {  //fungsi search ini didapat dari w3schools
        var value = $(this).val().toLowerCase();
        $("#userList tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

//===================================== I T E M S =====================================

$('.getAllItems').click(function (e) {
    e.preventDefault();
    refresh(getAllItems);
    agetAllItems();
    if(myRole > 0) $("th:last-child").remove();
    $("#orderBy, #sortBy").change(function () {
        agetAllItems();
    });

    $("#myInput").on("keyup", function() {  //fungsi search ini didapat dari w3schools
        var value = $(this).val().toLowerCase();
        $("#itemList tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

$('.addItem').click(function (e) {
    e.preventDefault();
    refresh(addItem);
    $('#saveItem').click(function (e){
        e.preventDefault();
        aaddItem("POST");
    });
});

function editItem(itemId){ //still working on
    refresh(addItem);
    $('.title1').html('<b class=\"bold1\">E</b>DIT<b class=\"bold1\">&nbsp;I</b>TEM');
    agetItemById(itemId);
    $('#saveItem').click(function (e){
        e.preventDefault();
        aaddItem("PUT");
    });
}

function deleteItem(itemId,itemName){
    var r = confirm(`You are going to delete user :\nId      : ${itemId}\nitemName : ${itemName}\n\nAre you sure? `);
    if(r==true){
        acheckItemRequest(itemId,"delete");//user tidak benar-benar di delete, melainkan hanya menganti value dari field enabled menjadi false.
        //ketika yang didelete adalah user dengan role superior(1), dan memiliki hubungan foreignkey ke user lain, maka tidak akan terjadi error dan id user ini tetap menjadi foreignkey di user lain, sehingga perlu dilakukan update manual dari user lain utk mengganti superior_id nya.
        $(`#${itemId}`).remove();
    }
}

var itemCount =0;

function add(btnId){
    itemCount++;
    console.log(itemCount);
    $('#itemCount').text(itemCount).css('display', 'block');
    $(`#${btnId}`).clone().appendTo('#cartItems').append('<button class="removeItem btn btn-danger" style="color:whitesmoke;width:100%;font-size: small;margin:3px;padding:5px;">Remove</button>');
    $('#cartItems .img,#cartItems .rem').remove();
    // $('#cartItems .rem').remove();
    $('#cartTotal').text("Total Items: " + itemCount);
    $(`.${btnId}`).prop('disabled',true);
}
function emptyCart(){
    itemCount = 0;
    $('#itemCount').css('display', 'none');
    $('#cartItems').text('');
    $('#reqMessage').text('');
    $('.quantity').val('');
    $('.ad').prop('disabled', false);
    $('#cartTotal').text("Total Items: " + itemCount);
}
$('.getAvailableItems').click(function (e) {
    e.preventDefault();
    refresh(getAvailableItems);
    $('#title').html('<b class=\"bold1\">A</b>VAILABLE<b class=\"bold1\">&nbsp;I</b>TEMS');
    agetAvailableItems();
    $("#orderBy, #sortBy").change(function () {
        agetAvailableItems();
    });

    $("#myInput").on("keyup", function() {  //fungsi search ini didapat dari w3schools
        var value = $(this).val().toLowerCase();
        $("#itemList tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


// Hide and Show Cart Items
    $('.openCloseCart').click(function(){
        $('#shoppingCart').modal("show");
        // $("#myModal").modal();

    });


// Empty Cart
    $('#emptyCart').click(function() {
        var r = confirm("Are you sure to empty your cart?");
        if (r==true) {
            emptyCart();
        }
    });

// Remove Item From Cart
    $('#shoppingCart').on('click', '.removeItem', function(){
        $(this).parent().remove();
        btnId =  $(this).parent().prop('id');
        itemCount --;
        $('#itemCount').text(itemCount);
        $('#cartTotal').text("Total Items: " + itemCount);
        if (itemCount == 0) {
            $('#itemCount').css('display', 'none');
        }
        $(`.${btnId}`).prop('disabled',false);
    });

    $('#submit').unbind().click(function () {
        submitRequest();
    });

}); //=============================== A V A I L A B L E    I T E M S     E N D S     H E R E ===============================

//=============================== R E Q U E S T S    S T A R T S    H E R E ===============================
$('.getAllRequests').click(function (e) {
    e.preventDefault();
    refresh(getAllRequests);
    if(myRole==0)
    {
        agetAllRequestsAdmin();
        $("#orderBy, #sortBy").change(function () {
            agetAllRequestsAdmin();
        });
    }
    else if(myRole==1) {
        agetAllRequestsSuperior();
        $("#orderBy, #sortBy").change(function () {
            agetAllRequestsSuperior();
        });
    }
    else if(myRole==2)
    {
        agetAllRequestsUser();
        $("#orderBy, #sortBy").change(function () {
            agetAllRequestsUser();
        });
    }
    $("#myInput").on("keyup", function() {  //fungsi search ini didapat dari w3schools
        var value = $(this).val().toLowerCase();
        $("#requestList tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

$('.getMyRequests').click(function (e) {
    e.preventDefault();
    refresh(getAllRequests);
    $('#title').html('<b class=\"bold1\">M</b>Y<b class=\"bold1\">&nbsp;R</b>SEQUEST');
    agetAllRequestsUser();
    $("#orderBy, #sortBy").change(function () {
        agetAllRequestsUser();
    });

    $("#myInput").on("keyup", function() {  //fungsi search ini didapat dari w3schools
        var value = $(this).val().toLowerCase();
        $("#requestList tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});




//=============================== R E Q U E S T S     E N D S     H E R E ===============================

