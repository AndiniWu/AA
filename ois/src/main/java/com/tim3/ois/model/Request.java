package com.tim3.ois.model;
import com.tim3.ois.model.User;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Target;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.*;
import java.util.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EnableJpaAuditing
@Table(name = "request")
public class Request {
    @Id
    @SequenceGenerator (name = "id_req", sequenceName = "req_seq",allocationSize = 1, initialValue= 1)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "id_req")
    @Column(name = "id")
    private int id;

    @Column(name = "request_by")
    private String user;

    @Column(name = "message")
    private String message;

    @Column(name = "status")
    private String status;

    @Column(name = "reject_note")
    private String rejectNote;

    @Column(name = "request_date", updatable = false)
    private long createdAt;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "request_detail",joinColumns ={@JoinColumn(name = "req_id")},inverseJoinColumns =@JoinColumn(name = "item_id"))
//    private Set<Item> item ;

    @Column(name = "approvedBy")
    private String approvedBy;

    @Column(name = "approval_date")
    private Long approvedAt;

    @Column(name = "return_date")
    private Long returnAt;


}
