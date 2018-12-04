package com.tim3.ois.service;


//import com.tim3.ois.model.Role;
import com.tim3.ois.model.User;
import com.tim3.ois.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("userService")
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }
    public List<User> findAll() {return userRepository.findAll();}
    public User findUserById(int id){return userRepository.findById(id);}
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public Boolean saveUser(User u){
        User userExists = userRepository.findByEmail(u.getEmail());
        if (userExists != null) {
            //bindingResult.rejectValue("email", "There is already a user registered with the email provided");
            return false;
        }
        else {
          userRepository.save(u);
          return true;
        }
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }
}
