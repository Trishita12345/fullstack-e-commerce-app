package com.e_commerce.productService.service;

import java.util.UUID;

public interface IProductDataIngestionService {
    void ingestProductDataToSearchIndex();

    void ingestProductDataToSearchIndexById(UUID productItemId);

    void deleteProductDataToSearchIndexById(UUID productItemId);
}
