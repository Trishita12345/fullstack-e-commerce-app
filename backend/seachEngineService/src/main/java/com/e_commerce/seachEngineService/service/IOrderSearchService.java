package com.e_commerce.seachEngineService.service;

import com.e_commerce.common.model.event.OrderFulfilledEvent;

public interface IOrderSearchService {

    void updateProductAndOrderIndexForConfirmedOrder(OrderFulfilledEvent event);

}
