package com.tim3.ois.service;

import com.sun.org.apache.xpath.internal.operations.Mult;
import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.model.CreateNewItem;
import com.tim3.ois.repository.ItemRepository;
import com.tim3.ois.model.ItemCount;
import com.tim3.ois.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service("itemService")
public class ItemService {

    private ItemRepository itemRepository;

    @Value("${static.path}")
    private static String UPLOADED_FOLDER = "D:/Blibli_Futureprogram/PROJECT/project/AA/asset/img/";
        // sesuai dengan folder kita masing-masing.

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

    public List<Item> findBy(String sortBy, String orderBy) {
        if (orderBy.toLowerCase().equals("asc"))
            return itemRepository.findAllBy(true, Sort.by(sortBy, "id").ascending());

        else if (orderBy.toLowerCase().equals("desc"))
            return itemRepository.findAllBy(true, Sort.by(sortBy, "id").descending());

        else return itemRepository.findAll();
    }
    public Boolean deleteItem(int id) {
        Item item = itemRepository.findById(id);
        if (item == null) {
            return false;
        }
        item.setEnabled(false);
        itemRepository.save(item);
        return true;
    }


    public ResponseEntity<?> updateItem(int id,CreateNewItem newItem) throws ResourceNotFoundException {
        Item item = itemRepository.findById(id);
        if (item == null) return new ResponseEntity("Item not found with id : " + id, HttpStatus.NOT_FOUND);
        String fileName = newItem.getFile().getOriginalFilename();
        MultipartFile file = newItem.getFile();
        if (StringUtils.isEmpty(fileName)) {
            return new ResponseEntity("Something error occured!", HttpStatus.BAD_REQUEST);
        }
        if (file.getContentType().equals("image/png") || file.getContentType().equals("image/jpg") || file.getContentType().equals("image/jpeg") || file.getContentType().equals("image/bmp")) {
            try {
                Path deletePath = Paths.get(UPLOADED_FOLDER + item.getImagePath());
                Files.delete(deletePath);
                item.setDetail(newItem.getDetail());
                item.setQuantity(newItem.getQuantity());
                item.setName(newItem.getName());
                item.setPrice(newItem.getPrice());
                item.setImagePath(fileName);
                saveUploadedFile(newItem.getFile());
                saveItem(item);
            } catch (IOException e) {
                return new ResponseEntity<>("Some error occured. Failed to add item", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity("Successed to update Item", HttpStatus.OK);
        }
        return new ResponseEntity("Error occured (file is not an image)", HttpStatus.BAD_REQUEST);

    }

    public ResponseEntity<?> storeItem(CreateNewItem newItem) {
        Item itemExist = itemRepository.findByName(newItem.getName());
        if(itemExist!=null)  return new ResponseEntity("Item already Exists with the name provided",HttpStatus.BAD_REQUEST);
        String fileName = newItem.getFile().getOriginalFilename();
        MultipartFile file = newItem.getFile();
        if (StringUtils.isEmpty(fileName)) {
            return new ResponseEntity("Something error occured!", HttpStatus.BAD_REQUEST);
        }
        if (file.getContentType().equals("image/png")||file.getContentType().equals("image/jpg")||file.getContentType().equals("image/jpeg")||file.getContentType().equals("image/bmp")) {
            try {
                //            item.setImage(bytes); // untuk save file / gambar ke field picture di database
                Item item = new Item();
                item.setDetail(newItem.getDetail());
                item.setQuantity(newItem.getQuantity());
                item.setName(newItem.getName());
                item.setPrice(newItem.getPrice());
                item.setImagePath(fileName);
                saveUploadedFile(newItem.getFile());
                saveItem(item);
            } catch (IOException e) {
                return new ResponseEntity<>("Some error occured. Failed to add item", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity("Successed to add Item", HttpStatus.OK);
        }
        return new ResponseEntity("Error occured (file is not an image)", HttpStatus.BAD_REQUEST);

    }
        private void saveUploadedFile(MultipartFile file) throws IOException {
            if (!file.isEmpty()) {
                byte[] bytes = file.getBytes();
                Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
                Files.write(path, bytes);
            }
        }
    public Item saveItem(Item item){
        item.setEnabled(true);
        return itemRepository.save(item);
    }
}
