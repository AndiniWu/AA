package com.tim3.ois.controller;


import com.tim3.ois.model.Item;
import com.tim3.ois.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/items/count")
    public Object getItemCount(){
        return itemService.getItemCount();
    }

    @GetMapping("/items")
    public List<Item> getAllItems(@RequestParam(value = "sortBy",required = false,defaultValue = "role")String sortBy,
                                  @RequestParam(value = "orderBy",required = false,defaultValue = "asc")String orderBy){
        return itemService.findBy(sortBy,orderBy);
    }

    @GetMapping("/items/onActiveRequest/{id}")
    public List<Object> getItemOnActiveRequest(
            @PathVariable(value = "id") int itemId){ // get item yang ada di request dgn status code < 3
        return itemService.getAllItemOnActiveRequest(itemId);
    }

    @GetMapping("/items/{id}")
    public Item getItem(@PathVariable(value = "id") int itemId){
        return itemService.findItemById(itemId);
    }

    @PostMapping(value = "/items", produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean createNewItem(
            @Valid
            @RequestBody
                    Item item, BindingResult bindingResult) {
        Item itemExists= itemService.findItemByName(item.getName());
        if (itemExists != null) {
            //bindingResult.rejectValue("item", "There is already an item registered with the name provided");
            return false;
        }
        itemService.saveItem(item);
        return true;
    }
    @PutMapping("/items/{id}")
    public Item updateItem(@PathVariable(value = "id") int itemId,
                           @Valid @RequestBody Item itemNow) {
        return itemService.updateItem(itemId,itemNow);
    }
    @PutMapping("/items/delete/{id}")
    public Boolean deleteItem(@PathVariable(value = "id")int itemId){
        return itemService.deleteItem(itemId);
    }

//    @DeleteMapping("/items/{id}")
//    public Boolean deleteItem(@PathVariable(value = "id")int itemId){
//        Item item = itemService.findItemById(itemId);
//        if(item==null){return false;}
//        itemService.deleteItem(item);
//        return true;
//    }

}
