package com.tim3.ois.repository;


import com.tim3.ois.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("itemRepository")
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item findById(int id);
    Item findByName(String name);
    List<Item> findAllByEnabledOrderByNameAsc( boolean bool);
    List<Item> findAllByEnabledOrderByIdAsc( boolean bool);
    List<Item> findAllByEnabledOrderByPriceAsc( boolean bool);
    List<Item> findAllByEnabledOrderByPriceDesc( boolean bool);
    List<Item> findAllByEnabledOrderByQuantityAsc( boolean bool);
    List<Item> findAllByEnabledOrderByQuantityDesc( boolean bool);
    List<Item> findAllByEnabledOrderByIdDesc(boolean bool);
//    @Query(value="select * from item i where i.quantity >=1 and enabled=true",nativeQuery = true)
//    List<Item> findAvailableItems();



}
