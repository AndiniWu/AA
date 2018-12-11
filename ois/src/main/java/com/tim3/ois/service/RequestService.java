package com.tim3.ois.service;

import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.model.Request;
//import com.tim3.ois.model.RequestDetail;
//import com.tim3.ois.repository.RequestDetailRepository;
import com.tim3.ois.model.User;
//import com.tim3.ois.model.UserEmail;
import com.tim3.ois.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.awt.geom.RoundRectangle2D;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("lendService")
public class RequestService {

    private RequestRepository requestRepository;

//    @Autowired
//    private RequestDetailRepository requestDetailRepository;

    @Autowired
    public RequestService(RequestRepository requestRepository){
        this.requestRepository = requestRepository;
    }
    public List<Request> findAll(){
        return requestRepository.findAll();
    }
//
//    public List<RequestDetail> findAllRequestDetail(){
//        return requestDetailRepository.findAll();
//    }

    public Request findRequestById(int id) throws ResourceNotFoundException {
        Request request = requestRepository.findById(id);
        if(request==null){throw new ResourceNotFoundException("Request","id" ,id);}
        return request;
    }


    public Request saveRequest(Request request){
        request.setCreatedAt(new Date().getTime());
        requestRepository.save(request);
        System.out.println(request);
        return request;
    }
//    public RequestDetail saveRequestDetail(RequestDetail reqDetail){
//        return requestDetailRepository.save(reqDetail);
//    }

    //UPDATE REQUEST STATUS REJECTED 0
    public Request updateRequest(int id,String status,String rejectNote) {
        Request request= requestRepository.findById(id);
//        request.setApprovedBy(email);
        request.setStatus(status);
        request.setRejectNote(rejectNote);
        request.setRejectedAt(new Date().getTime());
        Request updatedRequest = requestRepository.save(request);
        return updatedRequest;
    }

    //UPDATE REQUEST STATUS HAD BEEN APPROVED 1
    public Request updateRequest(int id, String status) {
        Request request= requestRepository.findById(id);
       // request.setApprovedBy(email);
        request.setStatus(status);
        request.setApprovedAt(new Date().getTime());
        Request updatedRequest = requestRepository.save(request);
        return updatedRequest;
    }

    //UPDATE REQUEST STATUS ROLLBACK 2
    public Request updateRequest(int id, String status,int EXTRA) {
        Request request= requestRepository.findById(id);
        request.setStatus(status);
        Request updatedRequest = requestRepository.save(request);
        return updatedRequest;
    }

    //UPDATE HANDEDBY ADMIN ITEM TAKEN 3
    public Request updateRequest(int id, Request req) {
        Request request= requestRepository.findById(id);
        request.setHandedBy(req.getHandedBy());
        request.setHandedAt(new Date().getTime());
        request.setStatus("Item(s) had been taken by requester");
        Request updatedRequest = requestRepository.save(request);
        return updatedRequest;
    }

    //UPDATE REQUEST STATUS ITEM RETURNED 4
    public Request updateRequest(int id,Request req,String EXTRA) {
        Request request= requestRepository.findById(id);
        request.setStatus("Item(s) had been returned by requester");
        request.setReturnedAt(new Date().getTime());
        request.setReceivedBy(req.getReceivedBy());
        Request updatedRequest = requestRepository.save(request);

        return updatedRequest;
    }

    public void deleteRequest(Request request){
        requestRepository.delete(request);
    }

//    public void deleteRequestDetail(RequestDetail reqDetail){
//         requestDetailRepository.delete(reqDetail);
//    }
}
