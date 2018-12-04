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
public class UserEmail {
    private String approvedBy;
    private String handedBy;
    private String rejectNote;
}
