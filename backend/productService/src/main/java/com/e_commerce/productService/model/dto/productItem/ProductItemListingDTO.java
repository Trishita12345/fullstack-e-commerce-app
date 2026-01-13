package com.e_commerce.productService.model.dto.productItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductItemListingDTO {

    private UUID productItemId;
    private String sku;
    private Integer avlStock;
    private BigDecimal basePrice;
    private BigDecimal discountedPrice;
    private String imgUrl;
    private List<String> attributes;
}
