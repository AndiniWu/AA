package com.tim3.ois.controller;

import com.tim3.ois.model.UserEmail;
import com.tim3.ois.model.Item;
import com.tim3.ois.model.Request;
import com.tim3.ois.model.User;
import com.tim3.ois.service.AssignmentService;
import com.tim3.ois.service.ItemService;
import com.tim3.ois.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;

@RestController
@RequestMapping("/api")
public class AssignmentController {
    @Autowired
    private RequestService requestService;
    @Autowired
    private ItemService itemService;
    @Autowired
    private AssignmentService assignmentService;

    @PutMapping("/assignments/{id}")
    public Request createNewAssignment(@PathVariable(value = "id") int id,
                                    @RequestBody UserEmail reqEmail) {
        // Request request = requestService.findRequestById(id);

        Request updatedRequest = assignmentService.updateRequest(id,reqEmail.getEmail());
        return updatedRequest;
    }



}
