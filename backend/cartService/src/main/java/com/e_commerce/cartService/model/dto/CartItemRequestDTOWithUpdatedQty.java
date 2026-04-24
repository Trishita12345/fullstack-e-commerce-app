package com.e_commerce.cartService.model.dto;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CartItemRequestDTOWithUpdatedQty{
    @NotNull
    private UUID productItemId;

    @Min(1)
    private Integer quantity;

    @NotNull
    private BigDecimal priceSnapshot;

    private Boolean isSelected;
    private Integer updatedQuantity;
}
