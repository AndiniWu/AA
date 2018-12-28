function aaddRequest(requestJson){
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/requests',
        data: requestJson,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json", //to parse string into JSON object,
        success: function (data) {
            var msg="";
            if (data.status!=null) {
                msg += "Successed to add request:\n\nRequest status : "+data.status;
            }
            else {
                msg += "Failed to add request";
            }
            console.log(msg);
            alert(`${msg}`);
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
            alert(`Error: ${error.status}\n\nField must not be null`);
        }
    });
}

function agetAllRequests(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/requests`,
        // ?orderBy=${$('#orderBy').val()}&sortBy=${$('#sortBy').val()}
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {      // FROM TRINCOT STACKOVERFLOW
            console.log("yes. data: " + data);
            if (!data || !data.length) return;
            $("#requestList").empty();// Clear whatever content there was before
            var len= data.length;
            for (var i = 0; i < len; i++) {
                var request = data[i]; // Use a local variable to avoid repetition
                if(!request) continue;
                console.log(request);
                // Use jQuery methods to add the content and bind a click handler

                $("#requestList").append(
                    $("<tr>").addClass("hov").append(
                        $("<td>").text(request.id),
                        $("<td>").text(request.status),
                        $("<td>").text(request.user.email),
                        $("<td>").text(request.message),
                        $("<td>").text(new Date(request.createdAt).toLocaleString()),
                        $("<td>").text(request.returnedAt > 0 ? new Date(request.returnedAt).toLocaleString() : "")
            ).click(getReqDetails.bind(null, request)) // <-- click handler for TR
                // click(getReqDetails.bind(null, request))
                );
            }
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}


function submitRequest(){
    var myCart=[];var cart={};
    var cek = $('#cartItems').children().length > 0 ;
    var list=``;
    if(cek==false){
        alert(`You added nothing to your cart!`);
    }
    if ( cek ) {
        var i=1;
        $('#cartItems tr').each(function () {
            cart = {
                item: {
                    id: parseInt($(this).find("td").eq(0).html()),
                    name: $(this).find("td").eq(1).html().toString()
                },
                qty: parseInt($(this).find("td .quantity").val())
            };
            if (cart.qty == 0 || cart.qty === null || cart.qty === undefined || isNaN(cart.qty)) {
                alert("Quantity must be filled!");
                cek = false;
                return cek;
            }
            list += ` ${i}. ${cart.item.name} : ${cart.qty}\n`;
            myCart.push(cart);
            i++;
        });
    }
    // console.log(myCart);
    if(cek) {
        var r = confirm(`Are you sure?\nItem you requested:\n${list}\nMessage :\n  ${$('#reqMessage').val()}`);
        if(r==true) {
            var request = {
                user: {id: user[0]},
                message: $('#reqMessage').val(),
                reqDetail: myCart
            };
            var requestJson = JSON.stringify(request);
            console.log(requestJson);
            aaddRequest(requestJson);
        }
    }

}

function getReqDetails(request) {
    if (request) {
        var reqDet = request.reqDetail;
        var date = request.status.length <= 8 ? request.rejectedAt : request.approvedAt;
        var dt = date > 0 ? new Date(date).toLocaleString() : "";
        $("#thead, #tbody, .modal-footer").empty();
        $('.modal-title').text(`Request Id : ${request.id}`);
        $("#thead").append(
            $("<tr>").append(
                $("<th>").text("Picture"),
                $("<th>").text("Id"),
                $("<th>").text("ItemName"),
                $("<th>").text("Qty"),
                $("<th>").text("Approved/RejectedDate"),
            )
        );
        for (var i = 0; i < reqDet.length; i++) {
            $("#tbody").append(
                $("<tr>").append(
                    $("<td>").text(reqDet[i].item.picture),
                    $("<td>").text(reqDet[i].item.id),
                    $("<td>").text(reqDet[i].item.name),
                    $("<td>").text(reqDet[i].qty),
                    $("<td>").text(dt))
            );
        }
        $("#note").prop('disabled', true).val(request.message);
        $("#feedback").val(request.feedback);
        var buttons = {
            approveBtn: $("<button>").addClass("btn btn-success").text("Approve Request").on('click', request, approveRequest), // kedua request sebagai parameter
            rejectBtn: $("<button>").addClass("btn btn-danger").text(" Reject Request").click(rejectRequest.bind(null, request)),
            giveBtn: $("<button>").addClass("btn btn-success").text("Give").on('click', request, giveItem), // kedua fungsi .on()/.bind()bisa dijalankan
            returnBtn: $("<button>").addClass("btn btn-danger").text("Return Item").on('click', request, returnItem),
            cancelRequestBtn: $("<button>").addClass("btn btn-danger").text("Cancel Request").on('click', request.id, cancelRequest)
        };
        //STATUS CODE == 4 ARTINYA ITEM BARU DI REQUEST, BELUM DI APPROVE ATAUPUN REJECT
        if (myRole == 1 && request.statusCode == 4) { //ROLE 1 == SUPERIOR
            $(".modal-footer").append(buttons.approveBtn, buttons.rejectBtn);
        } else if (myRole == 0) { //ROLE 0 == ADMIN
            $("#feedback").prop('disabled', true);
            if (request.statusCode == 1) $(".modal-footer").append(buttons.giveBtn);
            else if (request.statusCode == 2) $(".modal-footer").append(buttons.returnBtn);
        }
        else if (myRole == 2) {  //ROLE 2 == EMPLOYEE
            $("#feedback").prop('disabled', true);
            if (request.statusCode == 4) $(".modal-footer").append(buttons.cancelRequestBtn);
        }
        $("#myModal").modal();
    }
}

function cancelRequest(requestId){
    adeleteRequest(requestId.data);
}
function returnItem(request){
    aupdateRequest(request.data,3);
}
function giveItem(request){
    aupdateRequest(request.data,2);
}
function approveRequest(request){
    aupdateRequest(request.data,1);
}
function rejectRequest(request){
    aupdateRequest(request,0)
}


function aupdateRequest(request,code){
    request.feedback=$("#feedback").val();
    request.statusCode=code; // 0 = rejected , 1 == approved , 2 == give item/item sudah diambil , 3 == return / item sudah dikembalikan
    var requestJSON=JSON.stringify(request);
    console.log(requestJSON)
    $.ajax({
        type: 'PUT', //KENAPA TIDAK PAKAI ${VARIABEL} KARENA ITU MEMAKSA MENGKONVERSI SMUA VARIABEL MENJADI STRING}
        url: 'http://localhost:8080/api/requests/'+request.id+'?status='+code,
        data: requestJSON,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json", //to parse string into JSON object,
        success: function (data) {
            var msg="";
            if (data.status!=null) {
                msg += `Successed to update request:${data.statusCode}\n\nRequest status : ${data.status}`;
            }
            else {
                msg += "Failed to add request";
            }
            console.log(msg);
            alert(`${msg}`);
            refresh(agetAllRequests);
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
            alert(`Error: ${error.status}\n\nField must not be null`);
        }
    });
}

function adeleteRequest(id){
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:8080/api/requests/'+id,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json", //to parse string into JSON object,
        success: function (data) {
            var msg="";
            if (data==true) {
                msg += "Successed to delete request with id: "+id;
            }
            else {
                msg += "Failed to delete request with id: "+id;
            }
            console.log(msg);
            alert(`${msg}`);
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' .Error Message: ' + error.responseText);
            alert(`Error: ${error.status}\n\nFailed to delete request with id: ${id}`);
        }
    });
}