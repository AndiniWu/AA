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