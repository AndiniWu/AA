package com.tim3.ois.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateNewItem {
    private MultipartFile file;
    private String name;
    private String detail;
    private int quantity;
    private long price;
}
