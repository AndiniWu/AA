package com.tim3.ois.service;
//import com.tim3.ois.model.UserEmail;
import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.model.Item;
import com.tim3.ois.model.Request;
import com.tim3.ois.model.RequestDetail;
import com.tim3.ois.model.User;
import org.apache.catalina.mbeans.UserMBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import javax.validation.constraints.Email;

@Service("assigmentService")
public class RequestDetailService {
    @Autowired
    private ItemService itemService;
    @Autowired
    private RequestService requestService;
    private void updateRequestDetail(Request request,int status) {
        Item item;
        if (status == 1) {
            for (RequestDetail i : request.getReqDetail()) {
                item = itemService.findItemById(i.getItem().getId());
                System.out.println("item: " + item);
                item.setQuantity(item.getQuantity() - i.getQty());
                System.out.println("updatedItem: " + item.getQuantity() + " - " + i.getQty());
                Item tes = itemService.saveItem(item);
                System.out.println(tes);
            }
        } else if (status == 4) {
            for (RequestDetail i : request.getReqDetail()) {
                item = itemService.findItemById(i.getItem().getId());
                System.out.println("item: " + item);
                item.setQuantity(item.getQuantity() + i.getQty());
                System.out.println("updatedItem: " + item.getQuantity() + " + " + i.getQty());
                Item tes = itemService.saveItem(item);
                System.out.println(tes);
            }
        }
    }

    public Request updateRequest(int id, Request req, int status) throws ResourceNotFoundException {
        Request request = requestService.findRequestById(id);
        if(request==null){throw new ResourceNotFoundException("Request","id",id);}
        if (status == 1) {                          //ITEM APPROVED FIRST TIME*
            updateRequestDetail(request,status);
            return requestService.updateRequest(id, "approved / waiting for requester");
        } else if (status == 2) {                   // ITEM APOPROVED FOR ROLLBACK
            return requestService.updateRequest(id, "approved / waiting for requester", 1);
        } else if (status == 3) {                   // ITEM HAD BEEN TAKEN
            return requestService.updateRequest(id, req);
        } else if (status == 4) {                   // ITEM HAD BEEN RETURNED
            updateRequestDetail(request,status);
            return requestService.updateRequest(id,req,"EXTRA");}
        else {return requestService.updateRequest(id, "rejected", req.getRejectNote());}

    }
}
