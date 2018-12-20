//COLLAPSE
// Hide submenus
$('#body-row .collapse').collapse('hide'); 

// Collapse/Expand icon
$('#collapse-icon').addClass('fa-angle-double-left'); 

// Collapse click
$('[data-toggle=sidebar-colapse]').click(function() {
    SidebarCollapse();
});

function SidebarCollapse () {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
    
    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $('.sidebar-separator-title');
    if ( SeparatorTitle.hasClass('d-flex') ) {
        SeparatorTitle.removeClass('d-flex');
    } else {
        SeparatorTitle.addClass('d-flex');
    }
    
    // Collapse/Expand icon
    $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}

//MODAL
$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

// $(document).ready(function() {
    var user = getCookie("user");
    user = user.split(',');
    document.getElementById("profile").innerText = user[2];
// });

//IMAGE UPLOAD
// $("input").change(function(e) {

//     for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
        
//         var file = e.originalEvent.srcElement.files[i];
        
//         var img = document.createElement("img");
//         var reader = new FileReader();
//         reader.onloadend = function() {
//             img.src = reader.result;
//         }
//         reader.readAsDataURL(file);
//         $("input").after(img);
//     }
// });
var isi= document.getElementById("isi")
$('#logout').click(function(e){
    e.preventDefault();
    deleteCookie("user");
    window.location = "login";
});

$('#getAllUsers').click(function(e){
    e.preventDefault();
    window.location = "login";
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

    isi.innerHTML=addUser();
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




