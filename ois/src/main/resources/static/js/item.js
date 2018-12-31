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
                var txt = ``;
                if (len > 0) {
                    if(myRole==0) {
                        for (var i = 0; i < len; i++) {
                            if (data[i]) {
                                txt += `<tr >\n 
                                          <td>${data[i].picture}</td>                                      
                                          <td id=${data[i].id}>${data[i].id}</td>
                                          <td>${data[i].name}</td>
                                          <td>${data[i].quantity}</td>
                                          <td>${data[i].price}</td>
                                          <td>${data[i].detail}</td>
                                          <td align="center"  class="action1">
                                             <button   onclick="editItem(${data[i].id})" class="btn btn-warning">Edit&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                             <button onclick="deleteItem(${data[i].id},'${data[i].name}')" class="btn btn-danger">Delete</button>
                                          </td>
                                   </tr>`;
                            } //${variabel} atau template literals mengauto convert menjadi string ONCLICK onclick="deleteItem(${data[i].id},'${data[i].name}') jalan karena di javasript '2' di auto convert menjadi integer jika dibutuhkan.
                        }
                    }
                    else{
                        for (var i = 0; i < len; i++) {
                            if (data[i]) {
                                txt += `<tr>
                                          <td>${data[i].picture}</td>
                                          <td id=${data[i].id}>${data[i].id}</td>
                                          <td>${data[i].name}</td>
                                          <td>${data[i].quantity}</td>
                                          <td>${data[i].price}</td>
                                          <td>${data[i].detail}</td>
                                        </tr>`;
                            } //${variabel} atau template literals mengauto convert menjadi string ONCLICK onclick="deleteItem(${data[i].id},'${data[i].name}') jalan karena di javasript '2' di auto convert menjadi integer jika dibutuhkan.
                        }
                    }
                    if(txt) $("#itemList").html(txt);

                    // alert("Success :"+data);
                    console.log(data);
                }
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
                            \t\t\t\t<td class ="rem">${data[i].picture}</td>\n 
                            <td class="id">${data[i].id}</td>
                            <td>${data[i].name}</td>\n 
                            <td>${data[i].detail}. Stock left: ${data[i].quantity}</td>\n
                            <td class="qty"><input class="quantity" style="width: 100%;" type="number" maxlength="${maxL}" min="1" max="${data[i].quantity}" oninput="minMaxCheck(this)" placeholder="Max:${data[i].quantity}"></td>
                            <td align="center" class="rem action1">
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
        quantity:$('#quantity').val(),
        price:$('#price').val(),
        detail:$('#detail').val(),
        picture:$('#picture').val()
    };
    var itemJson = JSON.stringify(item);
    console.log(itemJson);
    if(type ==="POST") {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/items',
            data: itemJson,
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            dataType: "json", //to parse string into JSON object,
            success: function (data) {
                var msg="";
                if (data == false) {
                    msg += "There is already an item registered with the name provided"
                }
                else {
                    msg += "Successed to SAVE item";
                }
                console.log(msg);
                alert(`Result : \n\n ${msg}`);
            },
            error: function (error) {
                console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
                alert(`Error: ${error.status}\n\nPlease fill in the *`);
            }
        });
    }
    else if (type==="PUT"){
        var id=$('#id').val();
        console.log(`http://localhost:8080/api/items/${id}`);
        $.ajax({
            type: 'PUT',
            url: `http://localhost:8080/api/items/${id}`,
            data: itemJson,
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            dataType: "json", //to parse string into JSON object,
            success: function (data) {
                if(data){
                    console.log("Item updated : sucess");
                    alert("Successed to update item");
                }
            },
            error: function (error) {
                console.log('errorCode: ' + error.status + ' . Message: ' + error.responseText);
                alert(`Error: ${error.status}\n\nPlease fill in the *`);
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

function checkItemRequest(itemId){
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/items/onActiveRequest/`+itemId,
        headers: {
            "Content-Type": "application/json", "Accept": "application/json"
        },
        dataType:"json",
        success: function (data) {      // FROM TRINCOT STACKOVERFLOW
            console.log("yes. data: " + data);
            if (data.length!=0) {
                var msg="";
                for(var i =0; i< data.length;i++){
                    var req=data[i];
                    msg+=`${req[0]},Qty: ${req[1]}\n`       //req[0] adalah index dari requestId , req[1] adalah index dari quantity
                }
                alert(`Failed to delete item (id: ${itemId})\nThe Item(s) still being requested/taken in Request Id:\n${msg}`);
            }
            else{
                adeleteItem(itemId);
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
