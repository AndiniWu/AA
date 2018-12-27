var reqlist=[];

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
                        $("<td>").text(request.message.id),
                        $("<td>").text(new Date(request.createdAt).toLocaleString())
                    ).click(getReqDetails.bind(null, request)) // <-- click handler for TR
                );
            }
        },
        // success: function (data) {
        //     console.log("yes. data: " + data);
        //     if (data) {
        //         var len = data.length;
        //         var txt = ``;
        //         var returnedAt,feedback;
        //         if (len > 0) {
        //             for (var i = 0; i < len; i++) {
        //                 if(data[i]) {
        //                     reqlist.push(data[i]);
        //                     returnedAt = data[i].returnedAt > 0 ?new Date(data[i].returnedAt).toLocaleString(): "";
        //                     feedback = data[i].rejectedAt > 0 ?new Date(data[i].rejectedAt).toLocaleString(): "";
        //                     feedback += data[i].feedback == null? "": `d\n${data[i].feedback}`;
        //                     console.log(data[i]);
        //                     // <!--<tr class="hov" onclick="getReqDetails(${data[i]})">-->
        //                     txt += `
        //                             <tr class="hov" onclick="getReqDetails(${data[i].id})">
        //                                    <td>${data[i].id}</td>
        //                                    <td>${data[i].status}</td>
        //                                    <td>${data[i].user.email}</td>
        //                                    <td>${data[i].message}</td>
        //                                    <td>${new Date(data[i].createdAt).toLocaleString()}</td>
        //                                    <td>${returnedAt}</td>
        //                             </tr>`;
        //                 }
        //             }
        //             if(txt){
        //                 $("#requestList").html(txt);
        //             }
        //         }
        //     }
        // },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}

function getReqDetails(request){
    // var len = reqlist.length;
    // var req;
    // for (var i = 0; i < len;i++){
    //     if(reqlist[i].id==reqId){
    //         req=reqlist[i];
    //     }
    //     // $('#myModal').modal();
    // }
    if(request){
        $('#myModal').modal();
        $('.modal-title').text(`Request Id : ${request.id}`);
        var reqDet=request.reqDetail;
        var len=reqDet.length;
        var tr=``;
        var date = request.status.indexOf('rejected') ? request.rejectedAt:request.approvedAt;
        var dt   = date > 0 ? new Date(date).toLocaleString() : "";
        var feedback = request.feedback != null ? request.feedback : "";
        for(var i=0;i<len;i++){
           tr +=`<tr id="${request.id}">
                    <td>${reqDet[i].item.picture}</td>
                    <td>${reqDet[i].item.id}</td>  
                    <td>${reqDet[i].item.name}</td>
                    <td>${reqDet[i].qty}</td>
                    <td>${dt}</td>
                </tr>`;
        }
        var btn=`<button type="button" class="btn btn-success" data-dismiss="modal">&nbsp;Give Item&nbsp;</button>
                 <button type="button" class="btn btn-danger" data-dismiss="modal">Return Item</button>
                 <button type="button" class="btn btn-success" data-dismiss="modal">Approve</button>
                 <button type="button" class="btn btn-danger approve" data-dismiss="modal">&nbsp; Reject&nbsp;&nbsp;</button>`;
        var th=`<tr>
                    <th>Picture</th>
                    <th>Id</th>
                    <th>ItemName</th>
                    <th>Qty</th>
                    <th>Approved/RejectedDate</th>
                </tr>`;
        var fb=`<input id='feedback' style="width: 100%" value="${feedback}" placeholder="Feedback/reject note" type="text">`
        $('.modal .thead').html(th);
        $('.modal .tbody').html(tr);
        $('.modal .feedback').html(fb);
        $('.modal-footer').html(btn);
    }
}

// function approveRequest(request){
//
// }
$('.approve').click(function () {
    var reqId = parseInt($('.modal-title').text());
    console.log(reqId)
    var request={
        // feedback: $("#${reqId")
    }
    aupdateRequest(request,1);
});

function aupdateRequest(request,code){
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/api/requests?status=${code}`,
        data: request,
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