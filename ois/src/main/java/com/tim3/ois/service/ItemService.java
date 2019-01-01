package com.tim3.ois.service;

import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.repository.ItemRepository;
import com.tim3.ois.model.ItemCount;
import com.tim3.ois.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service("itemService")
public class ItemService {

    private ItemRepository itemRepository;

    private static String UPLOAD_FOLDER = "D:\\Blibli Futureprogram\\PROJECT\\project\\AA\\ois\\src\\main\\resources\\static\\img\\";// sesuai dengan folder kita masing-masing.

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    public ItemCount getItemCount() {
        ItemCount itemCount = new ItemCount();
        int itemOnReq = itemRepository.getOnRequest(true) == null ? 0 : itemRepository.getOnRequest(true);
        itemCount.setOnRequest(itemOnReq);
        int itemAvailable = itemRepository.getAvailable(true) == null ? 0 : itemRepository.getAvailable(true);
        itemCount.setAvailable(itemAvailable);
        itemCount.setTotal(itemCount.getAvailable() + itemCount.getOnRequest());
        return itemCount;
    }

    public Item findItemById(int id) throws ResourceNotFoundException {
        Item item = itemRepository.findById(id);
        if (item == null) {
            throw new ResourceNotFoundException("Item", "id", id);
        }
        return item;
    }

    public List<Object> getAllItemOnActiveRequest(int id) throws ResourceNotFoundException { // ambil semua item yang ada di request statuscode < 3 (item yang dalam request, approve, taken)
        Item item = itemRepository.findById(id);
        if (item == null) {
            throw new ResourceNotFoundException("Item", "id", id);
        }
        return itemRepository.getItemOnActiveRequest(id);
    }


    public Item findItemByName(String name) {
        return itemRepository.findByName(name);
    }

    public List<Item> findBy(String sortBy, String orderBy) {
        if (orderBy.toLowerCase().equals("asc"))
            return itemRepository.findAllBy(true, Sort.by(sortBy, "id").ascending());

        else if (orderBy.toLowerCase().equals("desc"))
            return itemRepository.findAllBy(true, Sort.by(sortBy, "id").descending());

        else return itemRepository.findAll();
    }

//    public List<Item> findAvailableItems(){
//        return itemRepository.findAvailableItems();
//    }


    //    public void deleteItem(Item item){
//        itemRepository.delete(item);
//    }
    public Boolean deleteItem(int id) {
        Item item = itemRepository.findById(id);
        if (item == null) {
            return false;
        }
        item.setEnabled(false);
        itemRepository.save(item);
        return true;
    }
//    public Item updateItem(int id,Item itemNow){
//        Item item = itemRepository.findById(id);
//        item.setQuantity(itemNow.getQuantity());
//        item.setDetail(itemNow.getDetail());
//        item.setPrice(itemNow.getPrice());
//        item.setName(itemNow.getName());
//        Item updatedItem = itemRepository.save(item);
//        return updatedItem;
//    }

    public ResponseEntity<?> updateItem(int id, String name, int quantity, long price, String detail, MultipartFile file) throws ResourceNotFoundException {
        try {
            Item item = itemRepository.findById(id);
            item.setName(name);
            item.setQuantity(quantity);
            item.setPrice(price);
            item.setDetail(detail);
            byte[] bytes = file.getBytes();
//            item.setImage(bytes);
            Path path = Paths.get(file.getOriginalFilename());
            item.setImagePath(path.toString());
            Files.write(path, bytes);
            saveItem(item);
        } catch (IOException e) {
            return new ResponseEntity<>("Some error occured. Failed to update item", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Successed to add Item", HttpStatus.OK);
    }

    public ResponseEntity<?> storeItem(String name, int quantity, long price, String detail, MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (StringUtils.isEmpty(fileName)) {
            return new ResponseEntity("Please select a file!", HttpStatus.OK);
        }
        try {
            Item item = new Item();
            item.setName(name);
            item.setQuantity(quantity);
            item.setPrice(price);
            item.setDetail(detail);
            byte[] bytes = file.getBytes();
//            item.setImage(bytes); // untuk save file / gambar ke field picture di database
            Path path = Paths.get(file.getOriginalFilename());
            item.setImagePath(path.toString());
            Files.write(path, bytes);
            saveItem(item);
        } catch (IOException e) {
            return new ResponseEntity<>("Some error occured. Failed to add item", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Successed to add Item", HttpStatus.OK);
    }




    public Item saveItem(Item item){
        item.setEnabled(true);
        return itemRepository.save(item);
    }
}
