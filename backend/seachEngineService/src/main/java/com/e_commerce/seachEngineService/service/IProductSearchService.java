package com.e_commerce.seachEngineService.service;

import java.util.UUID;

import com.e_commerce.common.model.event.ProductSearchDocumentEvent;

public interface IProductSearchService {

    void indexProduct(ProductSearchDocumentEvent event);

    void updateIndexProduct(ProductSearchDocumentEvent event);

    void deleteProduct(UUID id);

}
