package com.project.backendapp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 3,max = 200,message = "Name must be between 3 and 200 characters")
    private String name;

    @Min(value = 0,message = "Price mus be greater than 0")
    @Max(value =100000,message = "Price must be less than 100000")
    private Float price;

    private String thumbnail;

    private String description;

    @JsonProperty("category_id")
    private Long categoryId;


}
