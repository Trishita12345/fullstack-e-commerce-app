package com.e_commerce.cartService.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemRequestDTO {

    @NotNull
    private UUID productItemId;

    @Min(1)
    private Integer quantity;

    @NotNull
    private BigDecimal priceSnapshot;
}
