function getAllUsers(){
    return " <div class=\"col-md-3 title2\">\n" +
        "\t    \t\t<span class=\"title1\"><b class=\"bold1\">U</b>SER<b class=\"bold1\">L</b>IST</span>\n" +
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
        "<div class=\"col-md-3 col11\">\n            " +
        "   <label for=\"sortBy\">SortBy:</label>\n                    " +
        "        <select style='width: 36%' id='sortBy'>\n                       " +
        "            <option value='role'>Role</option>\n                        " +
        "            <option value='id'>Id</option>\n                      " +
        "            <option value='email'>email</option>\n                        " +
        "            <option value='superior'>superior</option>\n                    " +
        "        </select>\n                    " +
        "</div>\n                   " +
        "<div  class=\"col-md-3 col11\">\n                   " +
        "   <label for=\"orderBy\">OrderBy::</label>\n                  " +
        "       <select style='width: 36%' id='orderBy'>\n                       " +
        "           <option value='asc'>Asc</option>\n                        " +
        "           <option value='desc'>Desc</option>\n                    " +
        "       </select>\n                    " +
        "</div>    "+
        "            <div class='table-responsive'>\n" +
        "            \t<table class='table odd table-sm table-hover table-bordered'>\n" +
        "            \t\t<thead>\n" +
        "            \t\t\t<tr>\n" +
        "            \t\t\t\t<th>Picture</th>\n" +
        "            \t\t\t\t<th>ID</th>\n" +
        "            \t\t\t\t<th>Email</th>\n" +
        "            \t\t\t\t<th>NIK</th>\n" +
        "            \t\t\t\t<th>Name</th>\n" +
        "            \t\t\t\t<th>Division</th>\n" +
        "            \t\t\t\t<th>Position</th>\n" +
        "            \t\t\t\t<th>ContactNum</th>\n" +
        "            \t\t\t\t<th>Address</th>\n" +
        "            \t\t\t\t<th>Superior</th>\n" +
        "            \t\t\t\t<th class='action1' >Action</th>\n" +
        "            \t\t\t</tr>\n" +
        "            \t\t</thead>\n" +
        "            \t\t<tbody id='userList'>\n" +
        "            \t\t</tbody>\n" +
        "            \t</table>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\t</div>";
}