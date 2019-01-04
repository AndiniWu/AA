//package com.tim3.ois.service;
//
//import com.tim3.ois.model.Item;
//import com.tim3.ois.model.Request;
//import com.tim3.ois.repository.ItemRepository;
//import com.tim3.ois.repository.RequestRepository;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.MockitoAnnotations;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Page;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes = RequestServiceTest.class)
//public class RequestServiceTest {
//    @MockBean
//    RequestRepository requestRepository;
//
//    @InjectMocks
//    RequestService requestService;
//
//    @Before
//    public void init(){
//        MockitoAnnotations.initMocks(this);
//    }
//
//    @Test
//    public void findAll_sId_Test() {
//        Request request1= Request.builder()
//                .id(1)
//                .status("Pending")
//                .build();
//        Request request2= Request.builder()
//                .id(1)
//                .status("Approved")
//                .build();
//
//        Page<Request> requestList = new ArrayList<>();
//        requestList.add(request1);
//        requestList.add(request2);
//
//        when(requestRepository.findAll()).thenReturn();
//        requestService.findAll();
//        verify(re).findAll();
//    }
//}
