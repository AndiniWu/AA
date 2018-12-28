package com.tim3.ois.repository;


import com.tim3.ois.model.Item;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("itemRepository")
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item findById(int id);
    Item findByName(String name);
    @Query(value = "SELECT i FROM Item i WHERE i.enabled = :bool ")
    List<Item> findAllBy(
            @Param("bool") boolean bool,
            Sort sort);

//    @Query(value="select * from item i where i.quantity >=1 and enabled=true",nativeQuery = true)
//    List<Item> findAvailableItems();



}
