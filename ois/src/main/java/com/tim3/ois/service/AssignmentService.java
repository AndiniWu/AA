package com.tim3.ois.service;

import com.tim3.ois.model.Item;
import com.tim3.ois.model.Request;
import com.tim3.ois.model.RequestDetail;
import com.tim3.ois.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import javax.validation.constraints.Email;

@Service("assigmentService")
public class AssignmentService {
    @Autowired
    private ItemService itemService;
    @Autowired
    private RequestService requestService;
    public Request updateRequest(int id, String email) {
        Item item;
        Request request = requestService.findRequestById(id);

        for (RequestDetail i:request.getReqDetail()){
            item=itemService.findItemById(i.getItem().getId());
            System.out.println("item: " + item);
            item.setQuantity(item.getQuantity()-i.getQty());
            System.out.println("updatedItem: " + item.getQuantity() +" - " + i.getQty());
            Item tes = itemService.saveItem(item);
            System.out.println(tes);
        }
        return requestService.updateRequest(id, email);
    }
}
