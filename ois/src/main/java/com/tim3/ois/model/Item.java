package com.tim3.ois.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "item")
public class Item {
    @Id
    @SequenceGenerator (name = "id_item", sequenceName = "item_seq",allocationSize = 1, initialValue= 1)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "id_item")
    @Column(name = "id")
    private int id;

    @Column(name="name")
    @NotEmpty(message = "*Please provide the name")
    private String name;

    @Column(name="quantity")
    @NotNull(message = "*Please provide the quantity")
    private int quantity;

    @Column(name="price")
    @NotNull(message = "*Please provide the price")
    private long price;

    @Column(name="description")
    @NotEmpty(message = "*Please provide the description")
    private String description;

    @Column(name="picture")
    private String picture;

}


