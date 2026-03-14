package com.e_commerce.common.model.event;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSearchDocumentEvent {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ImageDTO {

        private String imgUrl;

        private Boolean isThumbnail;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VariantDTO {

        private String name;

        private String value;
    }

    private UUID productItemId;

    private UUID productId;

    private String productName;

    private String category;

    private Double basePrice;

    private Double sellingPrice;

    private Double discountPercentage;

    private Boolean inStock;

    private List<ImageDTO> images;

    private List<VariantDTO> variants;

}
