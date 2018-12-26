var user = getCookie("user");
user = user.split(',');
document.getElementById("profile").innerText = user[2];

var isi= document.getElementById("isi") //sebagai tempat pergantian konten halaman

$('#logout').click(function(e){
    e.preventDefault();
    deleteCookie("user");
    window.location = "login";
});

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

function minMaxCheck(obj){ // user tetap bisa melakukan input ',' tpi ketika msk ke backend tetap akan diambil angka pertama saja
    var v = obj.value.replace(/\D/g,'') //regex filter for integer only
    if(v>parseInt(obj.max)){
        v=parseInt(obj.max)
    }
    else if(v<parseInt(obj.min)){
       v=parseInt(obj.min)
    }
    else if(v > parseInt(obj.maxLength)) {
            v = v.slice(0, obj.maxLength);
    }
    obj.value=v;
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

$('#addUser').click(function(e){
    e.preventDefault();

    isi.innerHTML=addUser(); //mengubah isi konten dengan halaman adduser
    agetAllSuperiors();
    superiorList();
    $("#saveUser").click(function () {
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
    $("#saveUser").click(function () {
        var r = confirm("Are you sure?")
        if(r==true){
            aaddUser("PUT");
        }
    });
};
function deleteUser(userId,userName){
    var r = confirm(`You are going to delete user :\nId      : ${userId}\nemail : ${userName}\n\nAre you sure? `);
    if(r==true){
        adeleteUser(userId);//user tidak benar-benar di delete, melainkan hanya menganti value dari field enabled menjadi false.
        //ketika yang didelete adalah user dengan role superior(1), dan memiliki hubungan foreignkey ke user lain, maka tidak akan terjadi error dan id user ini tetap menjadi foreignkey di user lain, sehingga perlu dilakukan update manual dari user lain utk mengganti superior_id nya.
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
});

//===================================== I T E M =====================================

$('#getAllItems').click(function (e) {
    e.preventDefault();
    isi.innerHTML=getAllItems();
    agetAllItems();
    $("#orderBy, #sortBy").change(function () {
        agetAllItems('all');
    });

    $("#myInput").on("keyup", function() {  //fungsi search ini didapat dari w3schools
        var value = $(this).val().toLowerCase();
        $("#itemList tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
})

$('#addItem').click(function (e) {
    e.preventDefault();
    isi.innerHTML=addItem();
    $('#saveItem').click(function (e){
        aaddItem("POST");
    });
})

function editItem(itemId){ //still working on
    isi.innerHTML=addItem();
    $('#title').html('<b class=\"bold1\">E</b>DIT<b class=\"bold1\">&nbsp;I</b>TEM');
    agetItemById(itemId);
    $('#saveItem').click(function (e){
        aaddItem("PUT");
    });
};
function deleteItem(itemId,itemName){
    var r = confirm(`You are going to delete user :\nId      : ${itemId}\nemail : ${itemName}\n\nAre you sure? `);
    if(r==true){
        adeleteItem(itemId);//user tidak benar-benar di delete, melainkan hanya menganti value dari field enabled menjadi false.
        //ketika yang didelete adalah user dengan role superior(1), dan memiliki hubungan foreignkey ke user lain, maka tidak akan terjadi error dan id user ini tetap menjadi foreignkey di user lain, sehingga perlu dilakukan update manual dari user lain utk mengganti superior_id nya.
    }
};

var itemCount =0;
//tidak dapat dibuat eventlistener karena kemungkinan button add itu dibuat melalui string yang di append ke tabel sehingga ada kemungkinan class button tidak terbaca ketika javascript dijalankan.

function add(btnId){
    itemCount ++;
    console.log(itemCount);
    $('#itemCount').text(itemCount).css('display', 'block');
    $(`#${btnId}`).clone().appendTo('#cartItems').append('<button class="removeItem btn btn-danger" style="color:whitesmoke;width:100%;font-size: small;margin:3px;padding:5px;">Remove</button>');
    $('#cartItems .rem').remove();
    $('#cartTotal').text("Total Items: " + itemCount)
    $(`.${btnId}`).prop('disabled',true);
};

$('#getAvailableItems').click(function (e) {
    e.preventDefault();
    isi.innerHTML=getAvailableItems();
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
        $('#shoppingCart').toggle();
    });


// Empty Cart
    $('#emptyCart').click(function() {
        var r = confirm("Are you sure to empty your cart?")
        if (r==true) {
            itemCount = 0;
            $('#itemCount').css('display', 'none');
            $('#cartItems').text('');
            $('.quantity').val('');
            $('.ad').prop('disabled', false);
            $('#cartTotal').text("Total Items: " + itemCount);
        }
    });

// Remove Item From Cart
    $('#shoppingCart').on('click', '.removeItem', function(){
        $(this).parent().remove();
        btnId =  $(this).parent().prop('id');
        itemCount --;
        $('#itemCount').text(itemCount);
        $('#cartTotal').text("Total Items: " + itemCount)
        if (itemCount == 0) {
            $('#itemCount').css('display', 'none');
        }
        $(`.${btnId}`).prop('disabled',false);
    });

    $('#submit').click(function () {
        submitRequest();
    });

}); //=============================== A V A I L A B L E    I T E M S     E N D S     H E R E ===============================



