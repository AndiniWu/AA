package com.tim3.ois.controller;

import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.tim3.ois.model.User;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
//import java.util.

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/users")
    public List<User> getAllUsers(@RequestParam(value = "sortBy",required = false,defaultValue = "role")String sortBy,
                                  @RequestParam(value = "orderBy",required = false,defaultValue = "asc")String orderBy){
        return userService.findBy(sortBy,orderBy);
    }

    @GetMapping(value = "/users/superiors",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> getAllSuperiors(){
        System.out.println(userService.findUsersByRole(1));
        return userService.findUsersByRole(1);
    }


    @GetMapping("/users/{id}")
    public User getUser(@PathVariable(value = "id") int userId){
        return userService.findUserById(userId);
    }

    @PostMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean createNewUser(
            @Valid
            @RequestBody
                    User user, BindingResult bindingResult) {
        try{return userService.saveUser(user);}
        catch (ResourceNotFoundException ex){throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Please provide correct User data");}
        //TERAKHIR SAMPAI SINI 6/12/2018 13:15
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable(value = "id") int id,
                           @RequestBody User user) {
//        User user = userService.findUserById(userId);
//        if(user==null){throw new ResourceNotFoundException("User","id",userId);}
//        user.setPassword(userNow.getPassword());
        try {
            return userService.updateUser(id,user);
        }catch (ResourceNotFoundException ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Please provide correct User Id");
        }
    }

    @PutMapping("/users/delete/{id}")
    public Boolean deleteUser(@PathVariable(value = "id")int userId){
        return userService.deleteUser(userId);
    }

}




