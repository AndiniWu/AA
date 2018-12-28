function getAllItems(){
    return " <div class=\"col-md-3 title2\">\n" +
        "\t    \t\t<span class=\"title1\"><b class=\"bold1\">I</b>TEM<b class=\"bold1\">L</b>IST</span>\n" +
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
        "            <label for=\"sortBy\">SortBy::</label>\n" +
        "            <select style='width: 36%' id='sortBy'>\n" +
        "                <option value='name'>Name</option>\n" +
        "                <option value='id'>Id</option>\n" +
        "                <option value='quantity'>Qty</option>\n" +
        "                <option value='price'>Price</option>\n" +
        "            </select>\n" +
        "            </div>\n" +
        "            <div  class=\"col-md-3 col11\"> "+
        "           <label for=\"orderBy\">OrderBy:</label>" +
        "           <select style='width: 36%' id='orderBy'>\n" +
        "                <option value='asc'>Asc</option>\n" +
        "                <option value='desc'>Desc</option>\n" +
        "            </select>" +
        "            </div>"+
        "            <div class='table-responsive'>\n" +
        "            \t<table class='table table-sm table-hover table-bordered'>\n" +
        "            \t\t<thead>\n" +
        "            \t\t\t<tr>\n" +
        "            \t\t\t\t<th>ID</th>\n" +
        "            \t\t\t\t<th>Name</th>\n" +
        "            \t\t\t\t<th>Quantity</th>\n" +
        "            \t\t\t\t<th>Price</th>\n" +
        "            \t\t\t\t<th>Detail</th>\n" +
        "            \t\t\t\t<th>Picture</th>\n" +
        "            \t\t\t\t<th>Action</th>\n" +
        "            \t\t\t</tr>\n" +
        "            \t\t</thead>\n" +
        "            \t\t<tbody id='itemList'>\n" +
        "            \t\t</tbody>\n" +
        "            \t</table>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\t</div>";
}