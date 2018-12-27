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

function getReqDetails(request){
    if(request) {

        var reqDet = request.reqDetail;
        var len = reqDet.length;
        var date = request.status.length<=8 ? request.rejectedAt : request.approvedAt;
        var dt = date > 0 ? new Date(date).toLocaleString() : "";
        var feedback = request.feedback != null ? request.feedback : "";
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
        for (var i = 0; i < len; i++) {
            $("#tbody").append(
                $("<tr>").append(
                    $("<td>").text(reqDet[i].item.picture),
                    $("<td>").text(reqDet[i].item.id),
                    $("<td>").text(reqDet[i].item.name),
                    $("<td>").text(reqDet[i].qty),
                    $("<td>").text(dt))
            );
        }
        $("#note").prop('disabled',true).val(request.message);
        $("#feedback").val(feedback);
        $(".modal-footer").append(
            $("<button>").addClass("btn btn-success").text("Approve").click(updateRequest.bind(null,request))
        );
        $("#myModal").modal();

    }
}


// function approveRequest(request){
//
// }
function updateRequest(request){
    aupdateRequest(request,1);
};

function aupdateRequest(request,code){
    var requestJSON=JSON.stringify(request);

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/requests/'+request.id+'?status='+code,
        data: requestJSON,
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