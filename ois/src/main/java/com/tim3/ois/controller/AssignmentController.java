package com.tim3.ois.controller;


import com.tim3.ois.model.Item;
import com.tim3.ois.model.Request;
import com.tim3.ois.service.AssignmentService;
import com.tim3.ois.service.ItemService;
import com.tim3.ois.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AssignmentController {
    @Autowired
    private RequestService requestService;
    @Autowired
    private ItemService itemService;
    @Autowired
    private AssignmentService assignmentService;

    @PutMapping("/assignment/{id}")
    public Boolean createNewRequest(
            @Valid
            @RequestBody
                    Request request) {
    return assignmentService.updateItem(request);
    }


}
