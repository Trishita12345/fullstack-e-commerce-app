package com.e_commerce.seachEngineService.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "products_index")
@Setting(settingPath = "elasticsearch-settings.json")
public class ProductSearchDocument {

    @Id
    private UUID productItemId;

    @Field(type = FieldType.Keyword)
    private UUID productId;

    @Field(type = FieldType.Text, analyzer = "ngram_analyzer", searchAnalyzer = "standard")
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

    // stock quantity for "Few items left"
    @Field(type = FieldType.Integer)
    private Integer stockQuantity;

    // popularity tracking
    @Field(type = FieldType.Integer)
    private Integer purchaseCount;

    // trending score (calculated periodically)
    @Field(type = FieldType.Double)
    private Double trendingScore;

    // product rating
    @Field(type = FieldType.Double)
    private Double rating;

    // number of ratings
    @Field(type = FieldType.Integer)
    private Integer ratingCount;

    // boost for ranking algorithm
    @Field(type = FieldType.Double)
    private Double rankingBoost;

    // timestamps
    @Field(type = FieldType.Date)
    private Instant createdAt;

    @Field(type = FieldType.Date)
    private Instant updatedAt;

    // product images
    @Field(type = FieldType.Nested)
    private List<ImageDocument> images;

    // product variants
    @Field(type = FieldType.Nested)
    private List<VariantDocument> variants;

}