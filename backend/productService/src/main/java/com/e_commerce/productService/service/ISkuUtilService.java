package com.e_commerce.productService.service;

import java.util.Map;
import java.util.UUID;

public interface ISkuUtilService {

    /**
     * Generate unique SKU for a product item
     */
    String generateUniqueSku(UUID productId, Map<String, String> variants);

}
