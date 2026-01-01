package com.e_commerce.productService.model.dto.productItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductItemDTO {

    @Nullable
    private UUID productItemId;

    @NotNull
    private String sku;

    @NotNull
    private Integer avlStock;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = true, message = "Base price cannot be negative")
    private BigDecimal basePrice;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = true, message = "Discounted price cannot be negative")
    private BigDecimal discountedPrice;

    private List<ImageDTO> imgUrls;

    private Map<UUID, UUID> attributes;
}
