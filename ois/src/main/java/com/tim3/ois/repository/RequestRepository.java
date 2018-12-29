package com.tim3.ois.repository;

import com.tim3.ois.model.Request;
import com.tim3.ois.model.User;
import net.bytebuddy.TypeCache;
import net.bytebuddy.dynamic.scaffold.MethodGraph;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository("requestRepository")
public interface RequestRepository extends JpaRepository<Request, Integer> {
    Request findById(int id);

    @Query(value = "SELECT r FROM Request r WHERE r.user.id IN (SELECT u.id FROM User u WHERE u.enabled = :bool) ")
    List<Request> findAllBy(
            @Param("bool") boolean bool,
            Sort sort);

    @Query(value = "SELECT r FROM Request r WHERE r.user.id = (SELECT u.id FROM User u WHERE u.enabled = :bool AND u.id = :id)  ")
    List<Request> findAllByUser(
            @Param("id") Integer id,
            @Param("bool") boolean bool,
            Sort sort);

    @Query(value = "SELECT r FROM Request r WHERE r.user.id IN (SELECT u.id FROM User u WHERE u.superior.id = :id AND u.enabled = :bool) ")
    List<Request> findAllBySuperior(
            @Param("id") Integer id,
            @Param("bool") boolean bool,
            Sort sort);
}
