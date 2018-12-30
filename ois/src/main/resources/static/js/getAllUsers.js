function getAllUsers(){
    return " <div class=\"col-md-3 title2\">" +
        "    <span class=\"title1\"><b class=\"bold1\">U</b>SERS</span>" +
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
        "   <div class=\"col-md-3 col11 sort\">            " +
        "   <label for=\"sortBy\">SortBy:</label>                    " +
        "        <select style='width: 36%' id='sortBy'>                       " +
        "            <option value='role'>Role</option>                        " +
        "            <option value='id'>Id</option>                      " +
        "            <option value='email'>email</option>                        " +
        "            <option value='superior'>superior</option>                    " +
        "        </select>                    " +
        "</div>                   " +
        "<div  class=\"col-md-3 col11 sort\">                   " +
        "   <label for=\"orderBy\">OrderBy:</label>                  " +
        "       <select style='width: 36%' id='orderBy'>                       " +
        "           <option value='asc'>Asc</option>                        " +
        "           <option value='desc'>Desc</option>                    " +
        "       </select>                    " +
        "</div>    "+
        "            <div class='table-responsive'>" +
        "            <table class='table even table-sm table-hover table-bordered'>" +
        "            <thead>" +
        "            <tr>" +
        "            <th>Picture</th>" +
        "            <th>ID</th>" +
        "            <th>Email</th>" +
        "            <th>NIK</th>" +
        "            <th>Name</th>" +
        "            <th>Division</th>" +
        "            <th>Position</th>" +
        "            <th>ContactNum</th>" +
        "            <th>Address</th>" +
        "            <th>Superior</th>" +
        "            <th class='action1' >Action</th>" +
        "            </tr>" +
        "            </thead>" +
        "            <tbody id='userList'>" +
        "            </tbody>" +
        "            </table>" +
        "            </div>" +
        "        </div>" +
        "</div>";
}