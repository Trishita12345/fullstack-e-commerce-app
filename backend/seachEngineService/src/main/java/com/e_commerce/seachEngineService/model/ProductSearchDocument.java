package com.e_commerce.seachEngineService.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "products_index")
public class ProductSearchDocument {

    @Id
    private UUID productItemId;

    @Field(type = FieldType.Keyword)
    private UUID productId;

    @Field(type = FieldType.Text)
    private String productName;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Double)
    private Double basePrice;

    @Field(type = FieldType.Double)
    private Double sellingPrice;

    @Field(type = FieldType.Double)
    private Double discountPercentage;

    @Field(type = FieldType.Boolean)
    private Boolean inStock;

    @Field(type = FieldType.Nested)
    private List<ImageDocument> images;

    @Field(type = FieldType.Nested)
    private List<VariantDocument> variants;
}