package com.tim3.ois.repository;


import com.tim3.ois.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findById(int id);
    User findByEmailAndPassword(String email,String password);
    List<User> findAllByRoleAndEnabled(int role, boolean bool);
    List<User> findAllByEnabledOrderByEmailAsc(boolean bool);
    List<User> findAllByEnabledOrderByNameAsc(boolean bool);
    List<User> findAllByEnabledOrderByRoleAscEmailAsc(boolean bool) ;
    List<User> findAllByEnabledOrderByIdAsc(boolean bool);


}
