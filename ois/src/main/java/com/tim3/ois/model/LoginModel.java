package com.tim3.ois.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginModel {
    private int id;
    private String email;
    private String name;
    private int role;
    private String password;
}
