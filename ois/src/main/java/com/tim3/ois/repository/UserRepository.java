package com.tim3.ois.repository;


import com.tim3.ois.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findById(int id);
    User findByEmailAndAndPassword(String email,String password);
    List<User> findAllByRole(int role);

}
