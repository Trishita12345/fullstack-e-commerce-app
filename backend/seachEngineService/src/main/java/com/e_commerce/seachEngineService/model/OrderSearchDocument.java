package com.e_commerce.seachEngineService.model;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "orders_index")
public class OrderSearchDocument {

    @Id
    @Field(type = FieldType.Keyword)
    private UUID orderId;

    @Field
    private String orderStatus;

    @Field(type = FieldType.Nested)
    private List<CartItemDocument> items;

    @Field(type = FieldType.Keyword)
    private String userId;
}
