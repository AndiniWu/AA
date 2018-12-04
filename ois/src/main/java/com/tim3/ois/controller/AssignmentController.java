//package com.tim3.ois.controller;
//
//import com.tim3.ois.model.User;
//import com.tim3.ois.model.UserEmail;
//import com.tim3.ois.model.Request;
//import com.tim3.ois.service.RequestDetailService;
//import com.tim3.ois.service.ItemService;
//import com.tim3.ois.service.RequestService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api")
//public class AssignmentController {
//    @Autowired
//    private RequestService requestService;
//    @Autowired
//    private ItemService itemService;
//    @Autowired
//    private RequestDetailService requestDetailService;
//
//    @PutMapping("/assignments/{id}")
//    public Request createNewAssignment(@PathVariable(value = "id") int id,
//                                    @RequestBody User reqEmail,
//                                       @RequestParam(value = "approve") boolean status) {
//        // Request request = requestService.findRequestById(id);
//            Request updatedRequest = requestDetailService.updateRequest(id,reqEmail.getEmail(),status);
//             return updatedRequest;
//
//    }
//
//
//}
