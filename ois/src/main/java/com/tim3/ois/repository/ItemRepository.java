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

    @Query(value = "SELECT SUM(i.quantity) as current_quantity FROM Item i WHERE i.enabled =:bool",nativeQuery = true)
    Integer getAvailable( //curent inventory
            @Param("bool") boolean bool
    );

    @Query(value = "SELECT SUM(rd.quantity) as total_quantity FROM request_detail rd INNER JOIN request r on rd.request_id = r.id where r.status_code < 3" ,nativeQuery = true)
    Integer getOnRequest( //total item inventory + lagi dipinjam
            @Param("bool") boolean bool
    );

    @Query(value = " SELECT  rd.request_id,rd.quantity FROM request_detail rd INNER JOIN request r on rd.request_id = r.id where r.status_code < 3 and rd.item = :id",nativeQuery = true)            //active request adalah request dgn status code < 3
    List<Object> getItemOnActiveRequest(
            @Param("id") int id);
}
