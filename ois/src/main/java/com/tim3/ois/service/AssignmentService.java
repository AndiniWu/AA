package com.tim3.ois.service;

import com.tim3.ois.model.Item;
import com.tim3.ois.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("assigmentService")
public class AssignmentService {
    @Autowired
    private ItemService itemService;

    public Boolean updateItem(Request request) {
        Item itemNow;
        Item item;
        for (Item i:request.getItem()){
            item=itemService.findItemById(i.getId());
            System.out.println("item: " + item);
            item.setQuantity(item.getQuantity()-i.getQuantity());
            System.out.println("updatedItem: " + item.getQuantity() +" " + i.getQuantity());
            itemService.saveItem(item);
        }

        return true;
    }
}
