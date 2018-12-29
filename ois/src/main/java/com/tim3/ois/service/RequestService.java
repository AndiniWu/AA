package com.tim3.ois.service;

import com.tim3.ois.exception.ResourceNotFoundException;
import com.tim3.ois.model.Request;
import com.tim3.ois.service.RequestDetailService;
//import com.tim3.ois.model.RequestDetail;
//import com.tim3.ois.repository.RequestDetailRepository;
import com.tim3.ois.model.User;
//import com.tim3.ois.model.UserEmail;
import com.tim3.ois.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
    @Autowired
    public RequestDetailService requestDetailService;

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

    //sId == superior Id, eId == employee Id
    public List<Request> findAllBy(int eId, int sId, String sortBy,String orderBy) {
        if(sId != -1) { //superior view (approval page)
            if (orderBy.toLowerCase().equals("asc")) return requestRepository.findAllBySuperior(sId,true ,Sort.by(sortBy,"id").ascending());// Sort by parameter kedua adalah opsional, ketika butuh 2 sort
            else return requestRepository.findAllBySuperior(sId, true ,Sort.by(sortBy,"id").descending());
        }
        else if(eId != -1) {  //my request list view
            if (orderBy.toLowerCase().equals("asc")) return requestRepository.findAllByUser(eId,true ,Sort.by(sortBy,"id").ascending());
            else return requestRepository.findAllByUser(eId, true ,Sort.by(sortBy,"id").descending());
        }
        else if(eId == -1 && sId == -1) { //all request list view
            if (orderBy.toLowerCase().equals("asc")) return requestRepository.findAllBy(true,Sort.by(sortBy,"id").ascending());
            else return requestRepository.findAllBy(true,Sort.by(sortBy,"id").descending());
        } else throw new ResourceNotFoundException("Request","Request with user eId & sId",eId+", "+sId);
        }

    public Request saveRequest(Request request){ //STATUS CODE = 0 ITEM IS REQUESTED WAITING FOR APPROVAL
        request.setCreatedAt(new Date().getTime());
        if(request.getUser().getRole()==2) {
            request.setStatus("Pending/waiting for superior approval ");
            request.setStatusCode(0);
        }
        else if(request.getUser().getRole()<=1){
            request.setStatus("Approved/Item(s) waiting to be picked");
            request.setStatusCode(1);
            request.setApprovedAt(new Date().getTime());
        }
        requestRepository.save(request);
        requestDetailService.updateRequestDetail(request,1);
        System.out.println(request);
        return request;
    }
//    public RequestDetail saveRequestDetail(RequestDetail reqDetail){
//        return requestDetailRepository.save(reqDetail);
//    }

    //UPDATE REQUEST STATUS HAD BEEN APPROVED 1
    public Request updateRequest(int id,String feedback) {
        Request request= requestRepository.findById(id);
        request.setFeedback(feedback);
        request.setStatusCode(1);
        request.setApprovedAt(new Date().getTime());
        request.setStatus("Approved/Item(s) waiting to be picked");
        Request updatedRequest = requestRepository.save(request);
        return updatedRequest;
    }

    //UPDATE HANDEDBY ADMIN ITEM TAKEN 2
    public Request updateRequest(int id, Request req) {
        Request request= requestRepository.findById(id);
        request.setHandedBy(req.getHandedBy());
        request.setHandedAt(new Date().getTime());
        request.setStatus("Item(s) had been taken by requester");
        request.setStatusCode(2);
        Request updatedRequest = requestRepository.save(request);
        return updatedRequest;
    }
    //UPDATE REQUEST STATUS ITEM RETURNED 3
    public Request updateRequest(int id,Request req,String EXTRA) {
        Request request= requestRepository.findById(id);
        request.setStatus("Item(s) had been returned by requester");
        request.setReturnedAt(new Date().getTime());
        request.setStatusCode(3);
        request.setReceivedBy(req.getReceivedBy());
        Request updatedRequest = requestRepository.save(request);

        return updatedRequest;
    }

    //UPDATE REQUEST STATUS REJECTED 4
    public Request updateRequest(int id,String status,String feedback) {
        Request request= requestRepository.findById(id);
        request.setStatus(status);
        request.setFeedback(feedback);
        request.setRejectedAt(new Date().getTime());
        request.setStatusCode(4);
        Request updatedRequest = requestRepository.save(request);
        return updatedRequest;
    }

    public boolean deleteRequest(int reqId){ // CANCEL REQUEST
        Request request = requestRepository.findById(reqId);
        if(request==null){
            return false;
        }
        requestDetailService.updateRequestDetail(request,4);
        requestRepository.delete(request);
        return true;
    }

//    public void deleteRequestDetail(RequestDetail reqDetail){
//         requestDetailRepository.delete(reqDetail);
//    }
}
