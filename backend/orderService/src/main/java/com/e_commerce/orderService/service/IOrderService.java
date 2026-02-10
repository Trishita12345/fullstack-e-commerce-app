package com.e_commerce.orderService.service;

import java.math.BigDecimal;

import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryRequestDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryResponseDTO;

public interface IOrderService {

    BigDecimal placeOrderAndReserveInventory(String userId, PlaceOrderReqDTO placeOrderReq);

    PriceSummaryResponseDTO getPriceSummary(PriceSummaryRequestDTO priceSummaryRequestDTO);
}
