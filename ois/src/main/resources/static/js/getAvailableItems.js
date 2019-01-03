function getAvailableItems() {
    return " <div class=\"col-md-3 title2\">" +
        "    <span class=\"title1\"><b class=\"bold1\">A</b>VAILABLE<b class=\"bold1\"></b></span>" +
        "    </div>" +
        "            <div class=\"col-md-4 form-group\">" +
        "                <div class=\"input-group\">" +
        "                    <input id='myInput' type=\"text\" class=\"form-control\" placeholder=\"Search\">" +
        "                    <span class=\"input-group-append\">" +
        "                      <button class=\"btn1 fa fa-search\"></button>" +
        "                    </span>" +
        "                </div>" +
        "            </div>" +
        "            <div class=\"col-md-2\"></div>" +
        "            <div class=\"col-md-3 col11\">" +
        "            <label for=\"sortBy\">SortBy:</label>" +
        "            <select style='width: 36%' id='sortBy'>" +
        "                <option value='name'>Name</option>" +
        "                <option value='id'>Id</option>" +
        "                <option value='quantity'>Qty</option>" +
        "                <option value='price'>Price</option>" +
        "            </select>" +
        "            </div>" +
        "            <div  class=\"col-md-3 col11\"> " +
        "           <label for=\"orderBy\">OrderBy:</label>" +
        "           <select style='width: 36%' id='orderBy'>" +
        "                <option value='asc'>Asc</option>" +
        "                <option value='desc'>Desc</option>" +
        "            </select>" +
        "            </div>" +
        "            <div class='table-responsive'>" +
        "            <table style='vertical-align: middle ' class='table even table-sm table-bordered'>" +
        "            <thead>" +
            "            <tr class='table-light'>" +
                "            <th>Picture</th>" +
                "            <th>Id</th>" +
                "            <th>Name</th>" +
                "            <th>Detail</th>" +
                "            <th style='padding-right: 1.5em'>Quantity</th>" +
            "               <th>" +
                    "    <div id='cart-container'>" +
                    "      <div id='cart'>" +
                    "        <i class='fa fa-shopping-cart fa-2x openCloseCart' aria-hidden='true'></i>" +
                    "        <button id='emptyCart' class='btn btn-danger'><span style=\"color:whitesmoke;font-size:small;font-weight:bold;font-family:Verdana;\">Empty Cart</span></i></button>" +
                    "      </div>" +
                    "      <span id='itemCount'></span>" +
                    "    </div>" +
                    "</th>" +
        "            </tr>" +
        "            </thead>" +
        "            <tbody id='itemList'>" +
        "            </tbody>" +
        "            </table>" +
        "            </div>" +
        "        </div>" +
        "</div>";
}

// "  <div class='modal-fade' id='shoppingCart'>" +
// "    <div id='cartItemsContainer'>" +
// "      <h2>Items in your cart</h2>" +
// "      <i class='fa fa-times-circle-o fa-2x openCloseCart' aria-hidden='true'></i>" +
// "      <div class='table-responsive' style='height:400px;overflow: auto;'>" +
// "              <table class='table table-sm table-hover'>" +
// " <thead>"+
// "            <th>Id</th>" +
// "            <th>Name</th>" +
// "            <th>Detail</th>" +
// "            <th style='padding-right: 1.5em'>Quantity</th>" +
// "                     <th>&nbsp;</th>"+
// "</thead>     " +
// "            <tbody id='cartItems'>" +
// "            </tbody>" +
// "              </table>" +
// "          </div>" +
// "      <div id='cartTotal'></div>" +
// "<div><textarea  style='width: 100%;padding: 8px;height:80px;' id='reqMessage' placeholder='Why do you request the items? Type here'></textarea></div>"+
// "           <button style='float:right;' id='submit' type='submit' class='btn btn-default'><span style=\"color:white\">SUBMIT</span></button>" +
// "       </div>" +
// "       </div>