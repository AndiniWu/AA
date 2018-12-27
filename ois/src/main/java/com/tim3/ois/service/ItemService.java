package com.tim3.ois.service;

import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.repository.ItemRepository;

import com.tim3.ois.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("itemService")
public class ItemService {

    private ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository){
        this.itemRepository=itemRepository;
    }
    public List<Item> findAll(){
        return itemRepository.findAll();
    }

    public Item findItemById(int id) throws ResourceNotFoundException{
        Item item = itemRepository.findById(id);
        if(item==null){throw new ResourceNotFoundException("Item","id",id);}
        return item;
    }
    public Item updateItem(int id,Item itemNow){
        Item item = itemRepository.findById(id);
        item.setQuantity(itemNow.getQuantity());
        item.setDetail(itemNow.getDetail());
        item.setPrice(itemNow.getPrice());
        item.setName(itemNow.getName());
        Item updatedItem = itemRepository.save(item);
        return updatedItem;
    }
    public Item findItemByName(String name){
        return itemRepository.findByName(name);
    }

    public List<Item> findBy(String orderBy, String sortBy) {
        if(orderBy.equals("name") && sortBy.equals("asc")){
            System.out.println(itemRepository.findAllByEnabledOrderByNameAsc(true));
            return itemRepository.findAllByEnabledOrderByNameAsc(true);
        }
        else if(orderBy.equals("price") && sortBy.equals("asc")){
            return itemRepository.findAllByEnabledOrderByPriceAsc(true);
        }
        else if(orderBy.equals("price") && sortBy.equals("desc")){
            return itemRepository.findAllByEnabledOrderByPriceDesc(true);
        }
        else if(orderBy.equals("id") && sortBy.equals("asc")){
            return itemRepository.findAllByEnabledOrderByIdAsc(true);
        }
        else if(orderBy.equals("qty") && sortBy.equals("asc")){
            return itemRepository.findAllByEnabledOrderByQuantityAsc(true);
        }
        else if(orderBy.equals("qty") && sortBy.equals("desc")){
            return itemRepository.findAllByEnabledOrderByQuantityDesc(true);
        }
        else {
            return itemRepository.findAllByEnabledOrderByIdDesc(true);
        }
    }

//    public List<Item> findAvailableItems(){
//        return itemRepository.findAvailableItems();
//    }

    public Item saveItem(Item item){
        item.setEnabled(true);
        return itemRepository.save(item);
    }
//    public void deleteItem(Item item){
//        itemRepository.delete(item);
//    }
    public Boolean deleteItem(int id){
        Item item = itemRepository.findById(id);
        if(item==null){
            return false;
        }
        item.setEnabled(false);
        itemRepository.save(item);
        return true;
    }
}
