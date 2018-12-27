function getAvailableItems(){
    return " <div class=\"col-md-3 title2\">\n" +
        "\t    \t\t<span class=\"title1\"><b class=\"bold1\">A</b>VAILABLE<b class=\"bold1\"></b></span>\n" +
        "\t    \t</div>\n" +
        "            <div class=\"col-md-4 form-group\">\n" +
        "                <div class=\"input-group\">\n" +
        "                    <input id='myInput' type=\"text\" class=\"form-control\" placeholder=\"Search\">\n" +
        "                    <span class=\"input-group-append\">\n" +
        "                      \t<button class=\"btn1 fa fa-search\"></button>\n" +
        "                    </span>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-md-2\"></div>\n" +
        "            <div class=\"col-md-3 col11\">\n" +
        "            <label for=\"orderBy\">OrderBy:</label>\n" +
        "            <select style='width: 36%' id='orderBy'>\n" +
        "                <option value='id'>Qty</option>\n" +
        "                <option value='qty'>Qty</option>\n" +
        "                <option value='name'>Name</option>\n" +
        "                <option value='price'>Price</option>\n" +
        "            </select>\n" +
        "            </div>\n" +
        "            <div  class=\"col-md-3 col11\"> "+
        "           <label for=\"sortBy\">SortBy:</label>" +
        "           <select style='width: 36%' id='sortBy'>\n" +
        "                <option value='asc'>Asc</option>\n" +
        "                <option value='desc'>Desc</option>\n" +
        "            </select>" +
        "            </div>"+
        "            <div class='table-responsive'>\n" +
        "            \t<table class='tabel table-sm table-bordered'>\n" +
        "            \t\t<thead>\n" +
        "            \t\t\t<tr>\n" +
        "            \t\t\t\t<th>Picture</th>\n" +
        "            \t\t\t\t<th>Id</th>\n" +
        "            \t\t\t\t<th>Name</th>\n" +
        "            \t\t\t\t<th>Detail</th>\n" +
        "            \t\t\t\t<th style='padding-right: 1.5em'>Quantity</th>\n" +
        "            \t\t\t\t<th>" +
        "\t    <div id='cart-container'>\n" +
        "\t\t      <div id='cart'>\n" +
        "\t\t        <i class='fa fa-shopping-cart fa-2x openCloseCart' aria-hidden='true'></i>\n" +
        "\t\t        <button id='emptyCart' class='btn btn-danger'><span style=\"color:whitesmoke;font-size:small;font-weight:bold;font-family:Verdana;\">Empty Cart</span></i></button>\n" +
        "\t\t      </div>\n" +
        "\t\t      <span id='itemCount'></span>\n" +
        "\t\t    </div>\n" +
        "\t\t  </header>\n" +
        "\t\t  <div id='shoppingCart'>\n" +
        "\t\t    <div id='cartItemsContainer'>\n" +
        "\t\t      <h2>Items in your cart</h2>\n" +
        "\t\t      <i class='fa fa-times-circle-o fa-2x openCloseCart' aria-hidden='true'></i>\n" +
        "\t\t      <div class='table-responsive' style='height:400px;overflow: auto;'>" +
        "              <table class='table table-sm table-hover'>" +
        " <thead>"+
        "            \t\t\t\t<th>Id</th>\n" +
        "            \t\t\t\t<th>Name</th>\n" +
        "            \t\t\t\t<th>Detail</th>\n" +
        "            \t\t\t\t<th style='padding-right: 1.5em'>Quantity</th>\n" +
        "                     <th>&nbsp;</th>"+
        "</thead>     " +
        "            \t\t<tbody id='cartItems'>\n" +
        "            \t\t</tbody>\n" +
        "              </table>" +
        "          </div>\n" +
        "\t\t      <div id='cartTotal'></div>" +
        "<div><input type='text' style='width: 100%;padding: 8px;' id='reqMessage' placeholder='Enter your request message/note here'></div>"+
        "           <button style='float:right;' id='submit' type='submit' class='btn btn-default'><span style=\"color:white\">SUBMIT</span></button>\n" +
        "\t\t       </div>\n" +
        "\t\t       </div></th>\n" +
        "            \t\t\t</tr>\n" +
        "            \t\t</thead>\n" +
        "            \t\t<tbody id='itemList'>\n" +
        "            \t\t</tbody>\n" +
        "            \t</table>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\t</div>";
}