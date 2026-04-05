package com.e_commerce.productService.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.e_commerce.common.exception.BaseException;
import com.e_commerce.common.model.event.ProductSearchDocumentEvent;
import com.e_commerce.productService.kafka.ProductSearchDocumentIngestEventProducer;
import com.e_commerce.productService.model.ProductItem;
import com.e_commerce.productService.repository.IProductItemImageRepository;
import com.e_commerce.productService.repository.IProductItemRepository;
import com.e_commerce.productService.repository.IVariantRepository;
import com.e_commerce.productService.service.IProductDataIngestionService;
import com.e_commerce.productService.service.IS3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductDataIngestionService implements IProductDataIngestionService {

    private final IProductItemRepository productItemRepository;
    private final IVariantRepository variantRepository;
    private final IS3Service s3Service;
    private final IProductItemImageRepository productItemImageRepository;
    private final ProductSearchDocumentIngestEventProducer productSearchDocumentIngestEventProducer;

    @Override
    @Async
    public void ingestProductDataToSearchIndex() {
        System.out.println("Starting product data ingestion to search index...");
        try {
            List<UUID> productItemIds = productItemRepository.findAllProductItemIds();
            System.out.println("Fetched " + productItemIds.size() + " product item IDs for ingestion.");
            for (UUID productItemId : productItemIds) {
                // Simulate fetching product details and indexing
                System.out.println("Processing product item ID: " + productItemId);
                getAndIndexProductData(productItemId);
            }
            System.out.println("Product data ingestion completed successfully.");
        } catch (Exception e) {
            System.err.println("An error occurred during product data ingestion: " + e.getMessage());
        }
    }

    @Override
    public void ingestProductDataToSearchIndexById(UUID productItemId) {
        System.out.println("Starting ingestion for product item ID: " + productItemId);
        try {
            getAndIndexProductData(productItemId);
            System.out.println("Ingestion completed for product item ID: " + productItemId);
        } catch (Exception e) {
            System.err.println("Error during ingestion for product item ID: " + productItemId + " - " + e.getMessage());
        }
    }

    private void getAndIndexProductData(UUID productItemId) {
        System.out.println("Fetching details for product item ID: " + productItemId);
        try {
            Optional<ProductItem> productItemOptional = productItemRepository.findById(productItemId);
            if (productItemOptional.isPresent()) {
                ProductItem productItem = productItemOptional.get();
                ProductSearchDocumentEvent event = new ProductSearchDocumentEvent();
                event.setProductItemId(productItem.getId());
                event.setProductId(productItem.getProduct().getId());
                event.setProductName(productItem.getProduct().getName());
                event.setCategory(productItem.getProduct().getCategory().getName());
                event.setBasePrice(productItem.getBasePrice().doubleValue());
                event.setSellingPrice(productItem.getDiscountedPrice().doubleValue());
                double discount = ((productItem.getBasePrice().doubleValue()
                        - productItem.getDiscountedPrice().doubleValue()) / productItem.getBasePrice().doubleValue())
                        * 100;
                event.setDiscountPercentage(discount > 0 ? discount : 0);
                event.setInStock(productItem.getAvailableStock() > 0);
                event.setStockQuantity(productItem.getAvailableStock());
                event.setCreatedAt(productItem.getCreatedAt());
                event.setUpdatedAt(productItem.getUpdatedAt());
                List<ProductSearchDocumentEvent.ImageDTO> imageDTOs = productItemImageRepository
                        .findByProductItem_Id(productItem.getId()).stream()
                        .map(img -> new ProductSearchDocumentEvent.ImageDTO(s3Service.buildFullUrl(img.getImgUrl()),
                                img.getIsThumbnail()))
                        .collect(Collectors.toList());
                event.setImages(imageDTOs);
                List<ProductSearchDocumentEvent.VariantDTO> variantDTOs = variantRepository
                        .findByProductItemId(productItemId).stream()
                        .map(variant -> new ProductSearchDocumentEvent.VariantDTO(variant.getName(),
                                variant.getValue()))
                        .collect(Collectors.toList());
                event.setVariants(variantDTOs);
                System.out.println("Constructed ProductSearchDocumentEvent for product item ID: " + productItemId);
                // nicely print event details in terminal for debugging
                System.out.println("Event details: " + event);
                productSearchDocumentIngestEventProducer.publishProductSearchDocumentUpdated(event);
            } else {
                throw new BaseException("Product item not found for ID: " + productItemId,
                        HttpStatus.NOT_FOUND,
                        "PRODUCT_ITEM_NOT_FOUND");
            }
            System.out.println("Indexed product item ID: " + productItemId);
        } catch (Exception e) {
            System.err.println("Error indexing product item ID: " + productItemId + " - " + e.getMessage());
        }
    }

    @Override
    public void deleteProductDataToSearchIndexById(UUID productItemId) {
        productSearchDocumentIngestEventProducer.publishProductSearchDocumentDeleted(productItemId);
    }
}
