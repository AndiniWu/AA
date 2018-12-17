package com.tim3.ois.controller;


import com.tim3.ois.model.LoginModel;
import com.tim3.ois.model.User;
import com.tim3.ois.service.RequestService;
import com.tim3.ois.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private RequestService requestService;
    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public int login(@Valid
                         @RequestBody LoginModel loginModel){
        return userService.findUserByEmailAndPassword(loginModel.getEmail(),loginModel.getPassword());
    }

}
