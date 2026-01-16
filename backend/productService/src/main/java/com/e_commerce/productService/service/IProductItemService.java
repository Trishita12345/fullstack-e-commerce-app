package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.customer.CartProductItemInfoResponse;
import com.e_commerce.productService.model.dto.customer.ProductDetailsDTO;
import com.e_commerce.productService.model.dto.customer.ProductItemIdDTO;
import com.e_commerce.productService.model.dto.productItem.ProductItemDTO;
import com.e_commerce.productService.model.dto.productItem.ProductItemListingDTO;
import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductItemService {
    List<ProductVariantAttributesDTO> getVariantAttributesByCategoryId(UUID productId);

    UUID addProductItem(UUID productId, ProductItemDTO productItemDTO);

    ProductItemDTO getProductItemById(UUID productItemId);

    Page<ProductItemListingDTO> getProductItemListing(UUID productId, Pageable pageable, String filter, int page,
            int size, String sortBy,
            String direction);

    void deleteProductItemById(UUID productItemId);

    ProductItemDTO editProductById(UUID productItemId, ProductItemDTO productItemDTO);

    ProductDetailsDTO getProductDetailsByProductItemId(UUID productItemId);

    List<ProductItemIdDTO> getAllProductItemIds();

    Map<UUID, CartProductItemInfoResponse> getCarProductItemInfos(List<UUID> productItemIds);

}
