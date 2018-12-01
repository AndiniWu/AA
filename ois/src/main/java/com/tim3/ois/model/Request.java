package com.tim3.ois.model;
import com.tim3.ois.model.User;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "request")
public class Request {
    @Id
    @SequenceGenerator (name = "id_req", sequenceName = "req_seq",allocationSize = 1, initialValue= 1)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "id_req")
    @Column(name = "id")
    private int id;

    @Column(name = "user")
    private String user;

    @Column(name = "message")
    private String message;

    @Column(name = "status")
    private String status = "waiting";

    @Column(name = "request_date", updatable = false)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone="GMT")
    private Date createdAt;

    @ManyToMany
    @JoinTable(name = "request_detail", joinColumns ={@JoinColumn(name = "req_id")},inverseJoinColumns =@JoinColumn(name = "item_id"))
    private Set<Item> item;


    @Column(name = "approvedBy")
    private String approvedBy;

//    @OneToOne
//    @JoinTable(name = "approved_by", joinColumns ={@JoinColumn(name = "req_id")},inverseJoinColumns =@JoinColumn(name = "user_id"))
//    private User approvedBy;

    @Column(name = "approval_date", updatable = false)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone="GMT")
    private Date approvedAt;

    @Column(name = "return_date")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone="GMT")
    private Date returnAt;


}
