package com.tim3.ois.service;

import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.repository.ItemRepository;

import com.tim3.ois.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

    public List<Item> findBy(String sortBy, String orderBy) {
        if(orderBy.toLowerCase().equals("asc")) return itemRepository.findAllBy(true, Sort.by(sortBy,"id").ascending());

        else if(orderBy.toLowerCase().equals("desc")) return itemRepository.findAllBy(true, Sort.by(sortBy,"id").descending());

        else return itemRepository.findAll();
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
