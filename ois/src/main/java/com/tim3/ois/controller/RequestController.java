package com.tim3.ois.controller;

import com.tim3.ois.controller.ItemController;
import com.tim3.ois.model.Item;
import com.tim3.ois.model.Request;
import com.tim3.ois.model.RequestDetail;
import com.tim3.ois.model.User;
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

    @GetMapping("/request")
    public List<Request> getAllLends(){
        return requestService.findAll();
    }
    @PostMapping(value = "/request", produces = MediaType.APPLICATION_JSON_VALUE)
    public Request createNewRequest(
            @Valid
            @RequestBody
                    Request request, RequestDetail requestDetail, BindingResult bindingResult) {
//        Request requestExists= requestService.findRequestById(request.getId());
//
//        if (requestExists != null) {
//            //bindingResult.rejectValue("request", "There is already a request registered with the name provided");
//           return false;
//        }
        requestService.saveRequest(request);
        requestService.saveRequestDetail(requestDetail); // terakhir sampai sini
        return request;
    }

    @DeleteMapping("/request/{id}")
    public Boolean deleteRequest(@PathVariable(value = "id")int reqId){
        Request request = requestService.findRequestById(reqId);
        if(request==null){return false;}
        requestService.deleteRequest(request);
        return true;
    }
//



}
