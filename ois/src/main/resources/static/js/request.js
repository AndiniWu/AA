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
            $("reqMessage").val('');
            agetAvailableItems();
            emptyCart();
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
            alert(`Error: ${error.status}\n\nField must not be null`);
        }
    });
}
function agetAllRequestsAdmin(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/requests?&sortBy=${$('#sortBy').val()}&orderBy=${$('#orderBy').val()}`,
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
                    $("<tr>").addClass("hov").addClass(`s${request.statusCode}`).append(
                        $("<td>").text(request.id),
                        $("<td>").text(request.status),
                        $("<td>").text(request.user.email),
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

function agetAllRequestsSuperior(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/requests?sId=${myId}&sortBy=${$('#sortBy').val()}&orderBy=${$('#orderBy').val()}`,
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
                    $("<tr>").addClass("hov").addClass(`s${request.statusCode}`).append(
                        $("<td>").text(request.id),
                        $("<td>").text(request.status),
                        $("<td>").text(request.user.email),
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

function agetAllRequestsUser(){ //terakhir sampai sini
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/requests?eId=${myId}&sortBy=${$('#sortBy').val()}&orderBy=${$('#orderBy').val()}`,
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
                    $("<tr>").addClass("hov").addClass(`s${request.statusCode}`).append(
                        $("<td>").text(request.id),
                        $("<td>").text(request.status),
                        $("<td>").text(request.user.email),
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
                user: {
                    id: user[0],
                    role: myRole
                },
                message: $('#reqMessage').val(),
                reqDetail: myCart
            };
            var requestJson = JSON.stringify(request);
            console.log(request);
            aaddRequest(requestJson);
        }
    }

}

function getReqDetails(request) {
    if (request) {
        var reqDet = request.reqDetail;
        var date = request.statusCode < 4   ? request.approvedAt: request.rejectedAt;
        var dt = date > 0 ? new Date(date).toLocaleString() : "";
        var total =0,count=reqDet.length;
        $("#thead, #tbody,#mFooter").empty();
        $('.modal-title').html(`Request Id : ${request.id}  <span style="font-size:small">by ${request.user.email}</span> `);
        $("#thead").append(
            $("<tr>").append(
                $("<th>").text("Picture"),
                $("<th>").text("Id"),
                $("<th>").text("ItemName"),
                $("<th>").text("Qty"),
            )
        );
        for (var i = 0; i < reqDet.length; i++) {
            $("#tbody").append(
                $("<tr>").append(
                    $("<td>").text(reqDet[i].item.picture),
                    $("<td>").text(reqDet[i].item.id),
                    $("<td>").text(reqDet[i].item.name),
                    $("<td>").text(reqDet[i].qty))
            );
            total+=parseInt(reqDet[i].qty);
        }
        $("#tbody").append(
            $("<tr>").css({"background-color":"white"}).append(
                $("<td>").html(`ItemCount :`).addClass("text-right"),
                $("<td>").html(`<b>${count}</b>`),
                $("<td>").html(`Total :`).addClass("text-right"),
                $("<td>").html(`<b>${total}</b>`))
        );
        if (request.statusCode>=1 && request.statusCode<=3) $("#arDate").text(`ApprovedAt: ${dt}`);
        if(request.statusCode==2) {
            $("#tbody").append(
                $("<tr>").css("background-color","white").append(
                    $("<td>").text("HandedBy :").addClass("text-right"),
                    $("<td>").html(`<b>${request.handedBy}</b>`),
                    $("<td>").html(`At <b>${new Date(request.handedAt).toLocaleString()}</b>`).addClass("text-left"),
                    $("<td>").text(""))
            );
        }
        else if(request.statusCode==3) {
            $("#tbody").append(
                $("<tr>").css("background-color","white").append(
                    $("<td>").text("HandedBy :").addClass("text-right"),
                    $("<td>").html(`<b>${request.handedBy}</b>`),
                    $("<td>").html(`At <b>${new Date(request.handedAt).toLocaleString()}</b>`).addClass("text-left"),
                    $("<td>").text("")),
                $("<tr>").css("background-color","white").append(
                    $("<td>").text("ReturnReceivedBy :").addClass("text-right"),
                    $("<td>").html(`<b>${request.receivedBy}</b>`),
                    $("<td>").html(`At <b>${new Date(request.returnedAt).toLocaleString()}</b>`).addClass("text-left"),
                    $("<td>").text(""))
            );
        }
        else if(request.statusCode==4) $("#arDate").html(`RejectedAt: ${dt}`);

        $("#note").prop('disabled', true).val(request.message);
        $("#feedback").val(request.feedback);
        var buttons = {
            approveBtn: $("<button>").addClass("btn btn-success").attr("data-dismiss","modal").text("Approve Request").on('click', request, approveRequest), // kedua request sebagai parameter
            rejectBtn: $("<button>").addClass("btn btn-danger").attr("data-dismiss","modal").text(" Reject Request").click(rejectRequest.bind(null, request)),
            giveBtn: $("<button>").addClass("btn btn-success").attr("data-dismiss","modal").text("Give").on('click', request, giveItem), // kedua fungsi .on()/.bind()bisa dijalankan
            returnBtn: $("<button>").addClass("btn btn-danger").attr("data-dismiss","modal").text("Return Item").on('click', request, returnItem),
            cancelRequestBtn: $("<button>").attr("data-dismiss","modal").addClass("btn btn-danger").text("Cancel Request").on('click', request.id, cancelRequest)
        };
        //STATUS CODE == 4 ARTINYA ITEM BARU DI REQUEST, BELUM DI APPROVE ATAUPUN REJECT
        if (myRole == 1 && request.statusCode == 0) { //ROLE 1 == SUPERIOR
            $("#mFooter").append(buttons.approveBtn, buttons.rejectBtn);
        }
         else if (myRole == 0 && request.statusCode == 1) { //ROLE 0 == ADMIN
            $("#feedback").prop('disabled', true);
            $("#mFooter").append(buttons.giveBtn);
        }
        else if (myRole == 0 && request.statusCode == 2){
            $("#feedback").prop('disabled', true);
            $("#mFooter").append(buttons.returnBtn);
        }
        if ((myRole == 2 || myRole == 1 || myRole == 0) && (request.statusCode == 0 || request.statusCode == 1) && (myId==request.user.id)) {  //ROLE 2 == EMPLOYEE
            $("#feedback").prop('disabled', true);
            $("#mFooter").append(buttons.cancelRequestBtn);
        }
        $("#requestModal").modal();
    }
}

function cancelRequest(requestId){
    adeleteRequest(requestId.data);
}
function returnItem(request){
    request.data.receivedBy = myEmail;
    aupdateRequest(request.data,3);
}
function giveItem(request){
    request.data.handedBy = myEmail;
    aupdateRequest(request.data,2);
}
function approveRequest(request){
    aupdateRequest(request.data,1);
}
function rejectRequest(request){
    aupdateRequest(request,4)
}

function aupdateRequest(request,code){
    request.feedback=$("#feedback").val();
    request.statusCode=code; // 0 = request made , 1 == approved , 2 == give item/item sudah diambil , 3 == return / item sudah dikembalikan, 4 == rejected
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
            if(myRole==0) agetAllRequestsAdmin();
            else if(myRole==1) agetAllRequestsSuperior();
            else if(myRole==2) agetAllRequestsUser();
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
            if(myRole==0) agetAllRequestsAdmin();
            else if(myRole==1) agetAllRequestsSuperior();
            else if(myRole==2) agetAllRequestsUser();
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' .Error Message: ' + error.responseText);
            alert(`Error: ${error.status}\n\nFailed to delete request with id: ${id}`);
        }
    });
}
var currentPage =0;
function prevPage(){
    currentPage--;
    agetRecentUpdates(currentPage);
}
function nextPage(){
    currentPage++;
    agetRecentUpdates(currentPage);
}

function agetRecentUpdates(currentPage){;
    var url;
    if(myRole==0) url=`http://localhost:8080/api/requests/pageable?page=`+currentPage+ `&size=7`;
    else if(myRole==1) url = `http://localhost:8080/api/requests/pageable?sId=${myId}&page=`+currentPage+ `&size=7`;
    else if(myRole==2) url = `http://localhost:8080/api/requests/pageable?eId=${myId}&page=`+currentPage+ `&size=7`;
    console.log(url);
    var message=[
        "just made a request!",
        "just approved a request!",
        "just taken the requested item(s)!",
        "just returned the requested item(s)!",
        "request had just been rejected!"
    ];
    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data.content);
            if (data.empty || !data.content.length) return;
            $("#recent,#nextPrev").empty();// Clear whatever content there was before
            var len= data.content.length;
            for (var i = 0; i < len; i++) {
                var request = data.content[i]; // Use a local variable to avoid repetition
                if(!request) continue;
                console.log(request);
                // Use jQuery methods to add the content and bind a click handler
                var msg = message[request.statusCode];
                if(request.statusCode==1 & (request.user.role== 1 || request.user.role == 0)) msg= message[0]
                $("#recent").append(
                    $("<tr>").addClass("hov").addClass(`s${request.statusCode}`).attr('title', 'Click for details').append(
                        $("<td>").html(`&nbsp;    Mr/Mrs. ${request.user.email}`),
                        $("<td>").html(`&nbsp;    ${msg}  (<b>${request.id}</b>) at ${new Date(request.createdAt).toLocaleString()} `)
                    ).click(getReqDetails.bind(null, request)) // <-- click handler for TR
                );
            }
            var totalPage = data.totalPages-1;
            // console.log(totalPage);
            // console.log(currentPage);;
            // console.log(totalPage-currentPage);
            var hasNext = totalPage - currentPage > 0 ? true : false;
            var hasPrev = currentPage > 0 ? true : false;
            if(hasPrev) {
                $("#nextPrev").append(
                    $("<a>").css({"background-color": "whitesmoke",
                        "color": "#4CAF50,border-radius:20%","border-color": "#4CAF50"}).attr("href","#").addClass("previous round").html("&#8249;").click(
                        prevPage
                    )
                );
            }
            if(hasNext) {
                $("#nextPrev").append(
                    $("<a>").css({"background-color": "#4CAF50",
                "color": "whitesmoke","border-radius":"20%"}).attr("href","#").addClass("next round").html("&#8250;").click(
                        nextPage
                    )
                );
            }

        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}


function agetRequestCount(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/requests/count`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            // console.log(data);
            $("#approved").text(data.approved);
            $("#pending").text(data.pending);
            $("#rejected").text(data.rejected);
            $("#totalReq").text(`(${data.total})` );

        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}
function agetMyRequestCount(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/requests/count/`+myId,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            // console.log(data);
            $("#myApproved").text(data.approved);
            $("#myPending").text(data.pending);
            $("#myRejected").text(data.rejected);
            $("#myTotalReq").text(`(${data.total})` );

        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}


