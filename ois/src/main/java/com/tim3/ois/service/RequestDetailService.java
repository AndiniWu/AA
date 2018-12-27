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
            for (RequestDetail i : request.getReqDetail()) {
                item = itemService.findItemById(i.getItem().getId());
                System.out.println("item: " + item);
                if(status == 1) {     //kurangkan item di stok dengan item yang di request
                    item.setQuantity(item.getQuantity() - i.getQty());
                }
                else if(status == 0 || status == 4){              //tambahkan kembali item yang dikembalikan ke stok
                    item.setQuantity(item.getQuantity() + i.getQty());
                }
                System.out.println("updatedItem: " + item.getQuantity() + " +/- " + i.getQty());
                Item tes = itemService.saveItem(item);
                System.out.println(tes);
        }
    }

    public Request updateRequest(int id, Request req, int status) throws ResourceNotFoundException {
        Request request = requestService.findRequestById(id);
        if (request == null) {
            throw new ResourceNotFoundException("Request", "id", id);
        }
//        if(request.getStatus()<status) {
        if (status == 1) {                          //ITEM REQUESTED
            updateRequestDetail(request, status);
            return requestService.updateRequest(id, "Approved/Item(s) waiting to be picked");
        } else if (status == 2) {                   // REQUEST APPROVED FOR ROLLBACK
            return requestService.updateRequest(id, "Approved/Item(s) waiting to be picked", 2);
        } else if (status == 3) {                   // REQUEST HAD BEEN TAKEN or ITEM HANDED BY
            return requestService.updateRequest(id, req);
        } else if (status == 4) {                   // REQUEST HAD BEEN RETURNED
            updateRequestDetail(request, status);
            return requestService.updateRequest(id, req, "EXTRA");
        } else {                    // REQUEST REJECTED
            updateRequestDetail(request, status);
            return requestService.updateRequest(id, "Rejected", req.getFeedback());
        }
//
    }
}


