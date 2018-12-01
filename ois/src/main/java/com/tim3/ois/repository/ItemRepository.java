package com.tim3.ois.repository;


import com.tim3.ois.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("itemRepository")
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item findByName(String name);
    Item findById(int id);

}
