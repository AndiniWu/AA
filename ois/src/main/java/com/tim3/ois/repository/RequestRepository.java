package com.tim3.ois.repository;

import com.tim3.ois.model.Request;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("requestRepository")
public interface RequestRepository extends JpaRepository<Request, Integer> {
    Request findById(int id);

    @Query(value =  "SELECT r FROM Request r WHERE  r.user.enabled = :bool")
    Page<Request> findAll(
            @Param("bool") boolean bool,
            Pageable pageable);

    @Query(value = "SELECT r FROM Request r WHERE r.user.id IN (SELECT u.id FROM User u WHERE u.enabled = :bool) ")
    List<Request> findAllBy(
            @Param("bool") boolean bool,
            Sort sort);

    @Query(value = "SELECT r FROM Request r WHERE r.user.id = (SELECT u.id FROM User u WHERE u.enabled = :bool AND u.id = :id)  ")
    List<Request> findAllByUser(    // MENCARI SEMUA REQUEST USER MASING-MASING
            @Param("id") Integer id,
            @Param("bool") boolean bool,
            Sort sort);

    @Query(value = "SELECT r FROM Request r WHERE r.user.id IN (SELECT u.id FROM User u WHERE u.superior.id = :id AND u.enabled = :bool) ")
    List<Request> findAllBySuperior( // MENCARI SEMUA REQUEST YANG SUPERIORNYA ADALAH A
            @Param("id") Integer id,
            @Param("bool") boolean bool,
            Sort sort);

    @Query(value = "SELECT r FROM Request r WHERE r.user.id IN (SELECT u.id FROM User u WHERE u.superior.id = :id AND u.enabled = :bool) ")
    Page<Request> findAllBySuperiorPageable(
            @Param("id") Integer id,
            @Param("bool") boolean bool,
            Pageable pageable);

    @Query(value = "SELECT r FROM Request r WHERE r.user.id = (SELECT u.id FROM User u WHERE u.enabled = :bool AND u.id = :id)  ")
    Page<Request> findAllByUserPageable(    // MENCARI SEMUA REQUEST USER MASING-MASING
            @Param("id") Integer id,
            @Param("bool") boolean bool,
            Pageable pageable);

    @Query(value = "SELECT COUNT(r.id) from Request r where r.user.enabled = :bool")
    Integer getRequestCount(
            @Param("bool") boolean bool);

    @Query(value = "SELECT COUNT(r.id) from Request r where r.user.enabled = :bool AND r.statusCode = 4")
    Integer getRequestRejectedCount(
            @Param("bool") boolean bool);

    @Query(value = "SELECT COUNT(r.id) from Request r where r.user.enabled = :bool AND (r.statusCode > 0 and r.statusCode < 4)")
    Integer getRequestApprovedCount(
            @Param("bool") boolean bool);

    @Query(value = "SELECT COUNT(r.id) from Request r where r.user.enabled = :bool AND r.statusCode = 0")
    Integer getRequestPendingCount(
            @Param("bool") boolean bool);

    @Query(value = "SELECT COUNT(r.id) from Request r where (r.user.enabled = :bool AND r.user.id=:id) AND r.statusCode = 4")
    Integer getMyRequestRejectedCount(
            @Param("bool") boolean bool,
            @Param("id") Integer id);

    @Query(value = "SELECT COUNT(r.id) from Request r where(r.user.enabled = :bool AND r.user.id=:id) AND (r.statusCode > 0 and r.statusCode < 4)")
    Integer getMyRequestApprovedCount(
            @Param("bool") boolean bool,
            @Param("id") Integer id);

    @Query(value = "SELECT COUNT(r.id) from Request r where(r.user.enabled = :bool AND r.user.id=:id)  AND r.statusCode = 0")
    Integer getMyRequestPendingCount(
            @Param("bool") boolean bool,
            @Param("id") Integer id);
}
