package com.tim3.ois.controller;


import com.tim3.ois.model.CreateNewItem;
import com.tim3.ois.model.Item;
import com.tim3.ois.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(value="/items", consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    public ResponseEntity<?> createNewItem(
            @ModelAttribute("createNewItem") CreateNewItem createNewItem){
        return itemService.storeItem(createNewItem);
    }

    @PutMapping(value="/items/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    public ResponseEntity<?> updateItem(
            @PathVariable(value = "id") int id,
            @ModelAttribute("createNewItem") CreateNewItem createNewItem){
        return itemService.updateItem(id,createNewItem);
    }

    @PutMapping("/items/delete/{id}")
    public Boolean deleteItem(@PathVariable(value = "id")int itemId){
        return itemService.deleteItem(itemId);
    }

}
