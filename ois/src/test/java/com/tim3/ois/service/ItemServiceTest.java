package com.tim3.ois.service;

import com.tim3.ois.model.Item;
import com.tim3.ois.model.User;
import com.tim3.ois.repository.ItemRepository;
import com.tim3.ois.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ItemServiceTest.class)
public class ItemServiceTest {
    @MockBean
    ItemRepository itemRepository;

    @InjectMocks
    ItemService itemService;

    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void findAll_Test() {
        Item item1= Item.builder()
                .id(1)
                .name("Laptop")
                .build();
        Item item2= Item.builder()
                .id(2)
                .name("Mouse")
                .build();

        List<Item> itemList = new ArrayList<>();
        itemList.add(item1);
        itemList.add(item2);

        when(itemRepository.findAll()).thenReturn(itemList);
        itemService.findAll();
        verify(itemRepository).findAll();
    }
}
