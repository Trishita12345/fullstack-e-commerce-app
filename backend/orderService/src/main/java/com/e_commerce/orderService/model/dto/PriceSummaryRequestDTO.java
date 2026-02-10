package com.e_commerce.orderService.model.dto;

import java.util.List;

import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.common.model.dto.PlaceOrderReqDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
public class PriceSummaryRequestDTO {
    List<CartItemDTO> cartItems;
    PlaceOrderReqDTO placeOrderReqDTO;
}
