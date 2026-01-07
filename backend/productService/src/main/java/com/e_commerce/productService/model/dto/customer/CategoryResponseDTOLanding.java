package com.e_commerce.productService.model.dto.customer;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CategoryResponseDTOLanding {

    private UUID id;
    private String name;
    private String imgUrl;
    private Long quantity;
}
