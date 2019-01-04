//package com.tim3.ois.exception;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.MissingServletRequestParameterException;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.context.request.WebRequest;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.Date;
//
//@ControllerAdvice
//@RestController
//public class CustomizedResponseEntityExceptionHandler {
//    @ExceptionHandler(MissingServletRequestParameterException.class)
//    @RequestMapping(value = "**/**",
//            method = {
//                    RequestMethod.GET,
//                    RequestMethod.POST,
//                    RequestMethod.PUT,
//                    RequestMethod.DELETE,
//                    RequestMethod.HEAD,
//                    RequestMethod.OPTIONS,
//                    RequestMethod.PATCH,
//                    RequestMethod.TRACE
//            })
//    public ResponseEntity returnIncorrectMappingCalls(HttpServletRequest request) {
//        return new ResponseEntity("404 not Found\n"+new Date()+"  Path : \n"+request.getServletPath(), HttpStatus.NOT_FOUND);
//    }
//}