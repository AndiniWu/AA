package com.tim3.ois.service;

import com.tim3.ois.model.Request;
import com.tim3.ois.model.RequestDetail;
import com.tim3.ois.repository.RequestDetailRepository;
import com.tim3.ois.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("lendService")
public class RequestService {

    private RequestRepository requestRepository;

    @Autowired
    private RequestDetailRepository requestDetailRepository;

    @Autowired
    public RequestService(RequestRepository requestRepository){
        this.requestRepository = requestRepository;
    }
    public List<Request> findAll(){
        return requestRepository.findAll();
    }

    public List<RequestDetail> findAllRequestDetail(){
        return requestDetailRepository.findAll();
    }

    public Request findRequestById(int id){ return requestRepository.findById(id);}

    public Request saveRequest(Request request){
        request.setCreatedAt(new Date().getTime());
        requestRepository.save(request);
        System.out.println(request);
        return request;
    }
    public RequestDetail saveRequestDetail(RequestDetail reqDetail){
        return requestDetailRepository.save(reqDetail);
    }

    public Request updateRequest(int id, String email) {
        Request request= requestRepository.findById(id);
        request.setApprovedBy(email);
        request.setApprovedAt(new Date().getTime());
        Request updatedRequest = requestRepository.save(request);
        return updatedRequest;
    }

    public void deleteRequest(Request request){
        requestRepository.delete(request);
    }

    public void deleteRequestDetail(RequestDetail reqDetail){
         requestDetailRepository.delete(reqDetail);
    }
}
