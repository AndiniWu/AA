function addUser() {
    return '<span id="title" class="title1"><b class="bold1">A</b>DD<b class="bold1">U</b>SER</span>' +
        '<span id="mySup" style="float: right;"></span>'+
        '    <div class="col-md-9">' +
        '    <div class="col-md-3">' +
        '    <label class="col-form-label">Id</label>' +
        '    </div>' +
        '    <div class="col-md-6">' +
        '       <input id="id" type="text" class="form-control" name="id" maxlength="11" disabled="true">' +
        '    </div>' +
        '    <div class="col-md-3"></div>' +
        '    </div>' +
        '    <form class="form1">' +
            '    <div class="col-md-9"></div>' +
            '    <div class="col-md-9">' +
            '    <div class="col-md-3">' +
            '    <label class="col-form-label">NIK*</label>' +
            '    </div>' +
            '    <div class="col-md-6">' +
            '    <input id="nik" type="number" class="form-control dis" oninput="minMaxCheck(this)" name="nik" maxlength="20" required>' +
            '    </div>' +
            '    <div class="col-md-3"></div>' +
            '    </div>' +
            '    <div class="col-md-9"></div>' +
            '    <div class="col-md-9">' +
            '    <div class="col-md-3">' +
            '    <label class="col-form-label">Name*</label>' +
            '    </div>' +
            '    <div class="col-md-6">' +
            '    <input id="name" type="text" class="form-control dis" name="name" required>' +
            '    </div>' +
            '    <div class="col-md-3"></div>' +
            '    </div>' +
            '    <div class="col-md-9"></div>' +
            '    <div class="col-md-9">' +
            '    <div class="col-md-3">' +
            '    <label class="col-form-label ">Email*</label>' +
            '    </div>' +
            '    <div class="col-md-6">' +
            '    <input id="email" type="email" class="form-control dis" name="email" required>' +
            '    </div>' +
            '    <div class="col-md-3"></div>' +
            '    </div>' +
            '    <div class="col-md-9"></div>' +
            '    <div class="col-md-9">' +
            '    <div class="col-md-3">' +
            '    <label class="col-form-label">Password*</label>' +
            '    </div>' +
            '    <div class="col-md-6">' +
            '    <input id="password" type="password" class="form-control" name="password" required>' +
            '    </div>' +
            '    <div class="col-md-3"></div>' +
            '    </div>' +
            '    <div class="col-md-9"></div>' +
            '    <div class="col-md-9">' +
            '    <div class="col-md-3">' +
            '    <label class="col-form-label ">Division*</label>' +
            '    </div>' +
            '    <div class="col-md-6">' +
            '    <input id="division" type="text" class="form-control dis" name="division" required>' +
            '    </div>' +
            '    <div class="col-md-3"></div>' +
            '    </div>' +
            '    <div class="col-md-9"></div>' +
            '    <div class="col-md-9">' +
            '    <div class="col-md-3">' +
            '    <label class="col-form-label">Position*</label>' +
            '    </div>' +
            '    <div class="col-md-6">' +
            '    <input id="position" type="text" class="form-control dis" name="position" required>' +
            '    </div>' +
            '    <div class="col-md-3"></div>' +
            '    </div>' +
            '    <div class="col-md-9"></div>' +
            '    <div class="col-md-9">' +
            '    <div class="col-md-3">' +
            '    <label class="col-form-label">ContactNum*</label>' +
            '    </div>' +
            '    <div class="col-md-6">' +
            '    <input id="cnumber" type="number" class="form-control" oninput="minMaxCheck(this)" name="contact" maxlength="14" required>' +
            '    </div>' +
            '    <div class="col-md-3"></div>' +
            '    </div>' +
            '    <div class="col-md-9"></div>' +
            '    <div class="col-md-9">' +
            '    <div class="col-md-3">' +
            '    <label class="col-form-label">Address*</label>' +
            '    </div>' +
            '    <div class="col-md-6" style="float: left;">' +
            '    <textarea id="address" class="form-control" name="address" required></textarea>' +
            '    </div>' +
            '    </div>' +
            '    <div class="col-md-9"></div>' +
            '<div class="col-md-9 rm">' +
                '<div class="col-md-3 ">' +
            '       <label class="col-form-label">Role*</label>' +
                '</div>' +
            '    <div class="col-md-3"><label class="radio-inline">' +
                ' <input value=1 type="radio" name="optradio" class="enable_d" checked> &nbsp;Superior Employee' +
                '</div>' +
            ' <div class="col-md-3">' +
                '<label class="radio-inline">' +
                    ' <input value=2 id="emp" type="radio" name="optradio" >Employee' +
                '</label>' +
                '<select id="superiorList" class="form-control" disabled>' +
                     '<option value="">Optional</option>' +
                '</select>' +
            '   </div>' +
            '</div>' +
        '    <div class="col-md-9 wrap rm" style="margin-top: 7%;">' +
        '        <div class="col-md-3 ">' +
        '             <label class="col-form-label">Picture*</label>' +
        '        </div>' +
        '        <div class="col-md-6 rm">' +
        '               <input id="picture" type="file" name="picture" required>' +
        '        </div>' +
        '    </div>' +
        '    <div class="col-md-9" >' +
        '    <div class="col-md-3"></div>' +
        '    <div class="col-md-6" style="margin-top: 7%;">' +
            '    <button id="saveUser" type="submit" class="btn btn-success">SUBMIT</button>' +
            '    <button id="reset" type="reset" class="btn btn-warning">RESET</button>' +
            '    <button class="btn btn-primary" onclick="window.location.href=\'index\'">BACK</button>' +
        '    </div>' +
        '    <div class="col-md-3"></div>' +
        '    </div>' +
        '</form>'
}