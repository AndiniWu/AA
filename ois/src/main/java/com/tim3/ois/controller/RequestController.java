package com.tim3.ois.controller;

import com.tim3.ois.model.Request;
import com.tim3.ois.service.RequestDetailService;
import com.tim3.ois.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @GetMapping("/requests/pageable") // api for get recent updates
    public Page<Request> getRequestPage(
            @RequestParam(value = "eId",required = false,defaultValue = "-1") Integer eId,
            @RequestParam(value = "sId",required = false,defaultValue = "-1") Integer sId,
            @RequestParam(value = "page",required = false,defaultValue = "0") Integer page,
            @RequestParam(value = "size",required = false,defaultValue = "7") Integer size) {
        return requestService.findAll(eId,sId,page,size);
    }


    @GetMapping("/requests")
    public List<Request> getAllRequest(
            @RequestParam(value = "eId",required = false,defaultValue = "-1") Integer eId,
            @RequestParam(value = "sId",required = false,defaultValue = "-1") Integer sId,
            @RequestParam(value = "sortBy",required = false,defaultValue = "createdAt")String sortBy,
            @RequestParam(value = "orderBy",required = false,defaultValue = "asc")String orderBy){
        return requestService.findAllBy(eId,sId,sortBy,orderBy);
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
