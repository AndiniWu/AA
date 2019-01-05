function agetAllItems(){
    // console.log(`http://localhost:8080/api/items?orderBy=${sort[0]}&sortBy=${sort[0]}`)
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/items?sortBy=${$('#sortBy').val()}&orderBy=${$('#orderBy').val()}`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data);
            if (data) {
                var len = data.length;
                if (len > 0) {
                        $("#itemList").empty();
                        for (var i = 0; i < len; i++) {
                            console.log(data[i].imagePath);
                            if (data[i]) {
                                $("#itemList").append(
                                    $("<tr>").attr("id",`${data[i].id}`).append(
                                        $("<td>").addClass("noprint").html(`<img width="60px" height="60px"  src="/img/${data[i].imagePath}" alt="Image">`),
                                        $("<td>").addClass("hov").text(data[i].id).click(acheckItemRequest.bind(null, data[i].id, "get")),
                                        $("<td>").text(data[i].name),
                                        $("<td>").text(data[i].quantity),
                                        $("<td>").text(data[i].price),
                                        $("<td>").text(data[i].detail),
                                        $("<td>").addClass("remove noprint").html(`<button onclick="editItem(${data[i].id})" class="btn btn-warning">Edit&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                             <button onclick="deleteItem(${data[i].id},'${data[i].name}')" class="btn btn-danger">Delete</button>`)
                                    )
                                );
                            }}
                       }
                        if(myRole != 0 ) $(".remove").remove();
                        function printNow(){
                            $("#printItem").empty();
                            $("#printItem").append($("<p>").html("Items List at <span class='text-right'> "+ new Date(Date.now()).toLocaleString() +" </span><br>" ));
                            $("#allItem").clone().appendTo("#printItem");
                            $("#printItem .noprint").remove();
                            return xepOnline.Formatter.Format('printItem',{
                                    render:'newwin',
                                    filename:'Items List',
                                    pageWidth:'216mm',
                                    pageHeight:'279mm',
                                }
                            );
                        }
                        $("#print").html("<a href='#'><img src='/img/print.png' width='30px' height='30px'></a>");
                        // $("#print").append($("<a>").attr("href","#").width(30).height(30).append($("<img>").attr("src","/img/print.png")));
                        $("#print").click(printNow);
                        // alert("Success :"+data);
                        console.log(data);
                }

        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}
function agetAvailableItems(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/items?sortBy=${$('#sortBy').val()}&orderBy=${$('#orderBy').val()}`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data);

            if (data) {
                var len = data.length;
                var txt = ``;
                var maxL;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        if(data[i].quantity>0) {
                            maxL= `${data[i].quantity}`;
                            maxL = maxL.length;
                            txt += `<tr id="${data[i].id}" >\n                                            
                                        <td class="text-center text-middle img"><img width="60px" height="60px" src="/img/${data[i].imagePath}" alt="Image">            
                                        <td class="id text-middle">${data[i].id}</td>
                                        <td class="text-middle">${data[i].name}</td>\n 
                                        <td class="text-middle">${data[i].detail}. Stock left: ${data[i].quantity}</td>\n
                                        <td class="qty text-middle"><input class="quantity" style="width: 100%;" type="number" maxlength="${maxL}" min="1" max="${data[i].quantity}" oninput="minMaxCheck(this)" placeholder="Max:${data[i].quantity}"></td>
                                        <td class="text-middle action1 rem">
                                        <button onclick="add(${data[i].id})" class="ad btn btn-success ${data[i].id}"><span style="font-family:verdana;color:whitesmoke">&nbsp;&nbsp;&nbsp;Add&nbsp;&nbsp;&nbsp;&nbsp;</span></button>
                                        </td>\n
                                    </tr>`;
                        }
                    }
                    if(txt){
                        $("#itemList").html(txt);
                    }
                    // alert("Success :"+data);
                    console.log(data);
                    console.log(maxL);
                }
            }
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });

}

function aaddItem(type){
    var item = {
        name:$('#name').val(),
        quantity:parseInt($('#quantity').val()),
        price:parseInt($('#price').val()),
        detail:$('#detail').val(),
    };
    console.log(JSON.stringify(item));
    var data = new FormData();
    data.append("file",$("#image")[0].files[0]);
    // data.append("item",new Blob([JSON.stringify(item)],{type: "application/json"}));
    data.append("name",$('#name').val());
    data.append("quantity",parseInt($('#quantity').val()));
    data.append("price",parseInt($('#price').val()));
    data.append("detail",$('#detail').val());

    if(type ==="POST") {
        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: 'http://localhost:8080/api/items',
            data: data,
            contentType: false,
            processData: false,
            cache:false,
            success: function (data) {
               alert("SUCCESS"+data);
            },
            error: function (error) {
                console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
                alert(`Failed to add user: ${error.status}\n\nSome error occurred *`);
            }
        });
    }
    else if (type==="PUT"){
        $.ajax({
            type: 'PUT',
            enctype: 'multipart/form-data',
            url: 'http://localhost:8080/api/items/'+$("#id").val(),
            data: data,
            contentType: false,
            processData: false,
            cache:false,
            success: function (data) {
                alert("SUCCESS\n"+data);
            },
            error: function (error) {
                console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
                alert(`Error: ${error.status}\n\nSome error occurred`);
            }
        });
    }
}

function agetItemById(id){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/items/${id}`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data); // meng isi input field dengan value yg sdh ada
            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#quantity').val(data.quantity);
            $('#price').val(data.price);
            $('#detail').val(data.detail);
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}

function acheckItemRequest(itemId,type){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/items/onActiveRequest/`+itemId,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {
            console.log("yes. data: " + data);
            $("#itemOnUserBody").empty();
            if (data.length != 0) {
                var msg = "";
                for (var i = 0; i < data.length; i++) {
                    var req = data[i];
                    $("#itemOnUserBody").append(
                        $("<tr>").append(
                            $("<td>").text(req[0]),        //index 0 request Id,
                            $("<td>").text(req[2]),        //index 2 user Id
                            $("<td>").text(req[1])         // index 1 quantity on requestdetail
                        )
                    );
                }
            }
            if(type=="delete") {
                if (data.length != 0) {
                    // alert(`Failed to delete item (id: ${itemId})\nThe Item(s) still being requested/taken in Request Id:\n${msg}`);
                    $("#itemOnUserHead").html("<span class='red'>Item's still on request.\nPlease return/cancel the following request:</span>");
                    $("#itemOnUser").modal();
                }
                else {
                    adeleteItem(itemId);
                }
            }
            else if(type=="get"){

                console.log("OK get MODAL");
                $("#itemOnUserHead").text("Requests on this item");
                $("#itemOnUser").modal();
            }

        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
        }
    });
}
function adeleteItem(id){
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/api/items/delete/${id}`,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType: "json", //to parse string into JSON object,
        success: function (data) {
            if(data==true){
                console.log("Item DELETED : sucess");
                $(`#${id}`).parent().remove()
                alert("Successed to delete item");
            }
        },
        error: function (error) {
            console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
            alert(`Error: ${error.status}\n\nFailed to delete item with id : ${id}`);
        }
    });
}

function agetItemCount(){
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/api/items/count`,
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            dataType:"json",
            success: function (data) {
                $("#totalQty").text(data.total);
                $("#onRequest").text(data.onRequest);
                $("#available").text(data.available);
            },
            error: function (error) {
                console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
            }
        });
}
