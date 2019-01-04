package com.tim3.ois.service;

import com.tim3.ois.model.User;
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
@SpringBootTest(classes = UserServiceTest.class)
public class UserServiceTest {
    @MockBean
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void findUsersByRole_Test() {
        User user1= User.builder()
                .role(0)
                .email("a@mail.com")
                .enabled(true)
                .build();
        User user2= User.builder()
                .role(0)
                .email("b@mail.com")
                .enabled(true)
                .build();

        List<User> userList = new ArrayList<>();
        userList.add(user1);
        userList.add(user2);

        when(userRepository.findAllByRoleAndEnabledOrderByEmailAsc(0,true)).thenReturn(userList);
        userService.findUsersByRole(0);
        verify(userRepository).findAllByRoleAndEnabledOrderByEmailAsc(0,true);
    }

}
