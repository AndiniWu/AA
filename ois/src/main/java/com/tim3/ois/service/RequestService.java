package com.tim3.ois.service;

import com.tim3.ois.model.Request;
import com.tim3.ois.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("lendService")
public class RequestService {

    private RequestRepository requestRepository;

    @Autowired
    public RequestService(RequestRepository requestRepository){
        this.requestRepository = requestRepository;
    }
    public List<Request> findAll(){
        return requestRepository.findAll();
    }
    public Request findRequestById(int id){ return requestRepository.findById(id);}

    public Request saveRequest(Request request){
        return requestRepository.save(request);
    }


    public void deleteRequest(Request request){
        requestRepository.delete(request);
    }
}
