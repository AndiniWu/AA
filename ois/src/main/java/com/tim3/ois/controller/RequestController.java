package com.tim3.ois.controller;

import com.tim3.ois.controller.ItemController;
import com.tim3.ois.model.Item;
import com.tim3.ois.model.Request;
//import com.tim3.ois.model.RequestDetail;
import com.tim3.ois.model.User;
//import com.tim3.ois.model.UserEmail;
import com.tim3.ois.service.RequestDetailService;
import com.tim3.ois.service.RequestService;
import com.tim3.ois.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @Autowired
    private RequestDetailService requestDetailService;

//    @GetMapping("/requests")
//    public List<Request> getAllRequest(){
//        return requestService.findAll();
//    }

//    @GetMapping("/requests/{id}")
//    public Request getRequest(@PathVariable(value = "id") int reqId){
//        return requestService.findRequestById(reqId);
//    }
    @GetMapping("/requests")
    public List<Request> getAllRequest(
            @RequestParam(value = "superiorId",required = false)Integer id,
            @RequestParam(value = "sortBy",required = false,defaultValue = "createdAt")String sortBy,
            @RequestParam(value = "orderBy",required = false,defaultValue = "asc")String orderBy){
        return requestService.findAllBy(id,sortBy,orderBy);
    }

    @PostMapping(value = "/requests", produces = MediaType.APPLICATION_JSON_VALUE)
    public Request createNewRequest(
            @Valid
            @RequestBody
                    Request request) {
        requestService.saveRequest(request);
        return request;
    }

    @DeleteMapping("/requests/{id}")
    public Boolean deleteRequest(@PathVariable(value = "id")int reqId){
        return requestService.deleteRequest(reqId);
    }
//

    @PutMapping("/requests/{id}")
    public Request updateRequest(@PathVariable(value = "id") int id,
                                       @RequestBody(required = false) Request req,
                                       @RequestParam(value = "status",required = false,defaultValue = "0") Integer status) {
        // Request request = requestService.findRequestById(id);
        Request updatedRequest = requestDetailService.updateRequest(id, req ,status);
        return updatedRequest;

    }




}
