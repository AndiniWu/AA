package com.tim3.ois.controller;


import com.tim3.ois.model.Item;
import com.tim3.ois.model.User;
import com.tim3.ois.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/items")
    public List<Item> getAllItems(@RequestParam(value = "sortBy",required = false,defaultValue = "role")String sortBy,
                                  @RequestParam(value = "orderBy",required = false,defaultValue = "asc")String orderBy){
        return itemService.findBy(sortBy,orderBy);
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
