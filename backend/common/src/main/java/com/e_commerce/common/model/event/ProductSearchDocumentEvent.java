package com.e_commerce.common.model.event;

import java.time.LocalDateTime;
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

    private Integer stockQuantity;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<ImageDTO> images;

    private List<VariantDTO> variants;

    @Override
    public String toString() {

        String imageStr = images.stream()
                .map(i -> "\n     - url=" + i.getImgUrl() + ", thumbnail=" + i.getIsThumbnail())
                .toList()
                .toString();

        String variantStr = variants.stream()
                .map(v -> "\n     - " + v.getName() + ": " + v.getValue())
                .toList()
                .toString();

        return """
                ProductSearchDocumentEvent {
                  productItemId=%s
                  productId=%s
                  productName=%s
                  category=%s
                  basePrice=%s
                  sellingPrice=%s
                  discountPercentage=%s
                  inStock=%s
                  images=%s
                  variants=%s
                }
                """.formatted(
                productItemId,
                productId,
                productName,
                category,
                basePrice,
                sellingPrice,
                discountPercentage,
                inStock,
                imageStr,
                variantStr);
    }
}
