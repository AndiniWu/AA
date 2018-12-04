package com.tim3.ois.controller;


import com.tim3.ois.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.tim3.ois.model.User;
import org.springframework.web.servlet.ModelAndView;

import com.tim3.ois.repository.UserRepository;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

//    @GetMapping("/users")
//    public ModelAndView getRegistration() {
//        ModelAndView modelAndView = new ModelAndView();
//        User user = new User();
//        modelAndView.addObject("user", user);
//        modelAndView.setViewName("registration");
//        return modelAndView;
//    }
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.findAll();
    }


    @PostMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean createNewUser(
            @Valid
            @RequestBody
                    User user, BindingResult bindingResult) {

        return userService.saveUser(user);

    }

    @PutMapping("/users/{id}")
    public User updateUserPassword(@PathVariable(value = "id") int userId,
                           @Valid @RequestBody User userNow) {
        User user = userService.findUserById(userId);
        user.setPassword(userNow.getPassword());
        userService.saveUser(user);
        return user;

    }

    @DeleteMapping("/users/{id}")
    public Boolean deleteUser(@PathVariable(value = "id")int userId){
        User user = userService.findUserById(userId);
        if(user==null){return false;}
        userService.deleteUser(user);
        return true;
    }

}




