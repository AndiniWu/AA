package com.tim3.ois.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
//    private String resourceName;
//    private String fieldName;
//    private Object fieldValue;
    public ResourceNotFoundException( String errorMessage) {
        super( errorMessage);

//    public ResourceNotFoundException( String resourceName, String fieldName, Object fieldValue) {
//        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
//        this.resourceName = resourceName;
//        this.fieldName = fieldName;
//        this.fieldValue = fieldValue;
    }

}
