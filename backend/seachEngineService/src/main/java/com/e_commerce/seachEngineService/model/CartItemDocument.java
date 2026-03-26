package com.e_commerce.seachEngineService.model;

import java.util.UUID;

import org.springframework.data.elasticsearch.annotations.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CartItemDocument {

    @Field
    private UUID productItemId;

    @Field
    private Integer quantity;
}
