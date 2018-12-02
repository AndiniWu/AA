package com.tim3.ois.repository;

import com.tim3.ois.model.Request;
import com.tim3.ois.model.RequestDetail;
import com.tim3.ois.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository("requestDetailRepository")
public interface RequestDetailRepository extends JpaRepository<RequestDetail, Integer> {
    RequestDetail findByRequest(int id);
    RequestDetail findById(int id);
}
