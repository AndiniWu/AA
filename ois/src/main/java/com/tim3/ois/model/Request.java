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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.*;

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

    @ManyToOne
    @JoinColumn(name = "request_by",referencedColumnName = "id")
    private User user;

    @Value("")
    @Column(name = "message")
    private String message;


    @Column(name = "status")
    private String status;

    @Column(name = "request_date", updatable = false)
    private long createdAt;

    @OneToMany(targetEntity = RequestDetail.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id",referencedColumnName = "id")
    private Set<RequestDetail> reqDetail;

    @Column(name = "approval_date")
    private Long approvedAt;

    @Column(name = "handed_date")
    private Long handedAt;

    @Column(name = "handed_by")
    private String handedBy;

    @Column(name = "feedback")
    private String feedback;

    @Column(name = "rejected_date")
    private Long rejectedAt;

    @Column(name = "return_date")
    private Long returnedAt;

    @Column(name = "status_code")
    private Integer statusCode;

    @Column(name = "return_received_by")
    private String receivedBy;// ketika item dikembalikan diterima oleh admin siapa
}

