package com.tim3.ois.controller;

import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.tim3.ois.model.User;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.List;
//import java.util.

//@Controller
@Controller
public class IndexController {




//    @GetMapping("/index")
//    public ModelAndView getIndex() {
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("index");
//        return modelAndView;
//    }
//    @GetMapping("/login")
//    public ModelAndView login() {
//        ModelAndView modelAndView = new ModelAndView();
//
//        modelAndView.setViewName("login");
//        return modelAndView;
//    }
//
    @GetMapping("/**")
    public String index(){
        return "index";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }


}