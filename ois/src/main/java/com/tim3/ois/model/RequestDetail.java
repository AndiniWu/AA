package com.tim3.ois.model;
import com.tim3.ois.model.User;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.valueextraction.UnwrapByDefault;
import java.io.Serializable;
import java.time.Instant;
import java.util.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
/**
 * The join table
 * We **CAN'T** use the default generated entity name "post_tag" because this entity name is already used by the @JoinTable definition in the Post entity,
 * this would throw an exception like "SQL strings added more than once for: post_tag".
 * We must override the entity name and and set whatever else, here "PostTagEntity".
 * Because the entity name is different than the table name, we must set the @Table to map explicitly this entity on this table.
 */
@Entity
@Table(name = "request_detail")
public class RequestDetail {


    @Id
    @SequenceGenerator (name = "id_reqDet", sequenceName = "reqDet_seq",allocationSize = 1, initialValue= 1)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "id_reqDet")
    private int id;


    @ManyToOne(targetEntity = Item.class)
    @JoinColumn(name = "item",referencedColumnName = "id")
    private Item item;

    @Column(name = "quantity")
    private int qty;

}
