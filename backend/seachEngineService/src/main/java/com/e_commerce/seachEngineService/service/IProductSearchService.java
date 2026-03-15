package com.e_commerce.seachEngineService.service;

import java.util.UUID;

import com.e_commerce.common.model.event.ProductSearchDocumentEvent;
import com.e_commerce.seachEngineService.model.ProductSearchDocument;

public interface IProductSearchService {

    void indexProduct(ProductSearchDocumentEvent event, ProductSearchDocument existingDocument);

    void updateIndexProduct(ProductSearchDocumentEvent event);

    void deleteProduct(UUID id);

}
