package com.e_commerce.seachEngineService.kafka;

import lombok.AllArgsConstructor;

import java.util.UUID;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.ProductSearchDocumentEvent;
import com.e_commerce.common.utils.Constants;
import com.e_commerce.seachEngineService.service.IProductSearchService;

@Service
@AllArgsConstructor
public class ProductSearchDocumentEventConsumer {

    private final IProductSearchService productSearchService;

    @KafkaListener(topics = Constants.PRODUCT_SEARCH_INDEX_UPDATED_TOPIC, groupId = "search-service-group")
    public void consumeProductSearchDocumentUpdated(ProductSearchDocumentEvent event) {
        productSearchService.updateIndexProduct(event);
    }

    @KafkaListener(topics = Constants.PRODUCT_SEARCH_INDEX_DELETED_TOPIC, groupId = "search-service-group")
    public void consumeProductSearchDocumentDeleted(UUID productItemId) {
        productSearchService.deleteProduct(productItemId);
    }
}
