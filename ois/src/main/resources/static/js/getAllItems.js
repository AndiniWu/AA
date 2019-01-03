function getAllItems(){
    var dateNow = new Date(Date.now()).toLocaleString();
    return " <div>" +
                "<div  class=\"col-md-3 title2\">" +
                "    <span  class=\"title1\"><b class=\"bold1\">I</b>TEM<b class=\"bold1\">L</b>IST</span>" +
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
    "            <div  class=\"col-md-3 col11\"> "+
        "            <label for=\"orderBy\">OrderBy:</label>" +
        "                <select style='width: 36%' id='orderBy'>" +
            "                <option value='asc'>Asc</option>" +
            "                <option value='desc'>Desc</option>" +
        "                </select>" +
        "            <span id='print'>PRINT</span> "+
    "            </div>"+
    "            <div class='table-responsive'>" +
        "            <table id='allItem' class='table even table-sm table-hover table-bordered'>" +
        // "                <div class='printme'> " +
        // "                   <h4>Item List</h4> " +
        // "                       <span class='text-right dateNow'>" + dateNow +
        // "                       </span>" +
        // "                </div>" +
            "            <thead>" +
                "            <tr class='table-light'>" +
                    "            <th class='noprint'>Picture</th>" +
                    "            <th>ID</th>" +
                    "            <th>Name</th>" +
                    "            <th>Quantity</th>" +
                    "            <th>Price</th>" +
                    "            <th>Detail</th>" +
                    "            <th class='noprint'>Action</th>" +
                "            </tr>" +
            "            </thead>" +
            "            <tbody id='itemList'>" +
        "                </tbody>" +
        "            </table>" +
            "    </div>" +
            "</div>" +
        "<div id='printItem'></div>";
}