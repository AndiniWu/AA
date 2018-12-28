package com.tim3.ois.repository;


import com.tim3.ois.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findById(int id);
    User findByEmailAndPasswordAndEnabled(String email,String password, boolean bool);
    @Query(value = "SELECT u FROM User u WHERE u.enabled = :bool ")
    List<User> findAllBy(
            @Param("bool") boolean bool,
            Sort sort);
    List<User> findAllByRoleAndEnabledOrderByEmailAsc(int role, boolean bool);

}
