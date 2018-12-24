function getAllUsers(){
    return " <div class=\"col-md-3 title2\">\n" +
        "\t    \t\t<span class=\"title1\"><b class=\"bold1\">U</b>SER<b class=\"bold1\">L</b>IST</span>\n" +
        "\t    \t</div>\n" +
        "            <div class=\"col-md-4 form-group\">\n" +
        "                <div class=\"input-group\">\n" +
        "                    <input id='myInput' type=\"text\" class=\"form-control\" placeholder=\"Find by email...\">\n" +
        "                    <span class=\"input-group-append\">\n" +
        "                      \t<button class=\"btn1 fa fa-search\"></button>\n" +
        "                    </span>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-md-2\"></div>\n" +
        "            <div class=\"col-md-6 col11\">\n" +
        "            \t     <label for=\"sel1\">Order By:</label>\n" +
        "            <select style='width: 50%' id='orderBy'>\n" +
        "                <option value='role'>Role</option>\n" +
        "                <option value='email'>Email</option>\n" +
        "                <option value='name'>Name</option>\n" +
        "                <option value='id'>Id</option>\n" +
        "            </select>\n" +
        "            </div>\n" +
        "            <div class='table-responsive'>\n" +
        "            \t<table class='table table-sm table-hover table-bordered'>\n" +
        "            \t\t<thead>\n" +
        "            \t\t\t<tr>\n" +
        "            \t\t\t\t<th>ID</th>\n" +
        "            \t\t\t\t<th>Email</th>\n" +
        "            \t\t\t\t<th>NIK</th>\n" +
        "            \t\t\t\t<th>Name</th>\n" +
        "            \t\t\t\t<th>Division</th>\n" +
        "            \t\t\t\t<th>Position</th>\n" +
        "            \t\t\t\t<th>ContactNum</th>\n" +
        "            \t\t\t\t<th>Address</th>\n" +
        "            \t\t\t\t<th>Superior</th>\n" +
        "            \t\t\t\t<th>Picture</th>\n" +
        "            \t\t\t\t<th>Action</th>\n" +
        "            \t\t\t</tr>\n" +
        "            \t\t</thead>\n" +
        "            \t\t<tbody id='userList'>\n" +
        "            \t\t</tbody>\n" +
        "            \t</table>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\t</div>";
}