package com.e_commerce.productService.kafka;

import java.util.UUID;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.ProductSearchDocumentEvent;
import com.e_commerce.common.utils.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductSearchDocumentIngestEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishProductSearchDocumentUpdated(ProductSearchDocumentEvent event) {
        kafkaTemplate.send(Constants.PRODUCT_SEARCH_INDEX_UPDATED_TOPIC, event.getProductId().toString(), event);
    }

    public void publishProductSearchDocumentDeleted(UUID productItemId) {
        kafkaTemplate.send(Constants.PRODUCT_SEARCH_INDEX_DELETED_TOPIC, productItemId.toString(), productItemId);
    }
}
