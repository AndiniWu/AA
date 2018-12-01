package com.tim3.ois.service;

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

    public Item findItemById(int id){
        return itemRepository.findById(id);
    }
    public Item findItemByName(String name) {
        return itemRepository.findByName(name);
    }
    public Item saveItem(Item item){
        return itemRepository.save(item);
    }
    public void deleteItem(Item item){
        itemRepository.delete(item);
    }
}
