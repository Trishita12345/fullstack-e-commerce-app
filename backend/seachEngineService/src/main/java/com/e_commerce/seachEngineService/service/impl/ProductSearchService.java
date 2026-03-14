package com.e_commerce.seachEngineService.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.ProductSearchDocumentEvent;
import com.e_commerce.seachEngineService.model.ImageDocument;
import com.e_commerce.seachEngineService.model.ProductSearchDocument;
import com.e_commerce.seachEngineService.model.VariantDocument;
import com.e_commerce.seachEngineService.repository.IProductSearchRepository;
import com.e_commerce.seachEngineService.service.IProductSearchService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductSearchService implements IProductSearchService {

    private final IProductSearchRepository repository;

    @Override
    public void indexProduct(ProductSearchDocumentEvent event) {
        ProductSearchDocument document = convertToDocument(event);
        repository.save(document);
    }

    @Override
    public void deleteProduct(UUID productId) {
        ProductSearchDocument document = getByProductId(productId);
        if (document != null) {
            repository.delete(document);
        }
    }

    @Override
    public void updateIndexProduct(ProductSearchDocumentEvent event) {
        ProductSearchDocument document = getByProductId(event.getProductId());
        if (document != null) {
            repository.save(document);
        } else {
            indexProduct(event);
        }
    }

    private ProductSearchDocument convertToDocument(ProductSearchDocumentEvent event) {
        ProductSearchDocument document = ProductSearchDocument.builder()
                .productId(event.getProductId())
                .productItemId(event.getProductItemId())
                .productName(event.getProductName())
                .basePrice(event.getBasePrice())
                .sellingPrice(event.getSellingPrice())
                .discountPercentage(event.getDiscountPercentage())
                .inStock(event.getInStock())
                .category(event.getCategory())
                .build();
        List<ImageDocument> imageDocuments = event.getImages().stream()
                .map(img -> ImageDocument.builder()
                        .imgUrl(img.getImgUrl())
                        .isThumbnail(img.getIsThumbnail())
                        .build())
                .toList();
        List<VariantDocument> variantDocuments = event.getVariants().stream()
                .map(variant -> VariantDocument.builder()
                        .name(variant.getName())
                        .value(variant.getValue())
                        .build())
                .toList();
        document.setImages(imageDocuments);
        document.setVariants(variantDocuments);
        return document;
    }

    private ProductSearchDocument getByProductId(UUID productItemId) {
        return repository.findById(productItemId).orElse(null);
    }

}