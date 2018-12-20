

function findByEmail(){
    var input = document.getElementById("findByEmail").value.toUpperCase();
    var table = document.getElementById("userTable");
    var tr = document.getElementsByTagName("tr");
    var td;
    for(var i=0;i<tr.length;i++){
        td=tr[i].getElementsByTagName("td")[1];
        if(td){
            if(td.innerHTML.toUpperCase().indexOf(input)>-1){
                tr[i].style.display="";
            }else{
                tr[i].style.display="none";
            }
        }
    }
}