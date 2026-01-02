package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.Product;
import com.e_commerce.productService.model.ProductItem;
import com.e_commerce.productService.model.ProductItemImage;
import com.e_commerce.productService.model.VariantAttribute;
import com.e_commerce.productService.model.dto.productItem.ImageDTO;
import com.e_commerce.productService.model.dto.productItem.ProductItemDTO;
import com.e_commerce.productService.model.dto.productItem.ProductItemFilter;
import com.e_commerce.productService.model.dto.productItem.ProductItemListingDTO;
import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;
import com.e_commerce.productService.repository.IProductItemRepository;
import com.e_commerce.productService.repository.IVariantAttributeRepository;
import com.e_commerce.productService.service.IProductItemService;
import com.e_commerce.productService.service.IProductService;
import com.e_commerce.productService.service.IS3Service;
import com.e_commerce.productService.service.IVariantService;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductItemService implements IProductItemService {

        private IProductService productService;
        private IVariantService variantService;
        private IVariantAttributeRepository variantAttributeRepository;
        private IProductItemRepository productItemRepository;
        private IS3Service s3Service;

        private final String s3PublicUrl = "https://loom-and-lume.s3.ap-south-1.amazonaws.com";

        @Override
        public List<ProductVariantAttributesDTO> getVariantAttributesByCategoryId(UUID productId) {
                Product existingProduct = productService.getProduct(productId);
                Category category = existingProduct.getCategory();
                return variantService.getVariantsByCategoryId(category.getId());
        }

        @Transactional
        @Override
        public UUID addProductItem(UUID productId, ProductItemDTO dto) {

                Product product = productService.getProduct(productId);

                ProductItem productItem = ProductItem.builder()
                                .sku(dto.getSku())
                                .availableStock(dto.getAvlStock())
                                .basePrice(dto.getBasePrice())
                                .discountedPrice(dto.getDiscountedPrice())
                                .product(product)
                                .build();

                Set<UUID> attributeIds = new HashSet<>(dto.getAttributes().values());

                Set<VariantAttribute> attributes = new HashSet<>(variantAttributeRepository.findAllById(attributeIds));

                productItem.setVariantAttributes(attributes);

                List<ProductItemImage> images = dto.getImgUrls().stream()
                                .map(img -> {
                                        String finalKey = s3Service.moveFromTempToProducts(img.getUrl());
                                        return ProductItemImage.builder()
                                                        .imgUrl(finalKey)
                                                        .isThumbnail(img.getIsThumbnail())
                                                        .productItem(productItem)
                                                        .build();
                                })
                                .toList();

                productItem.setImages(new HashSet<>(images));

                ProductItem saved = productItemRepository.save(productItem);
                return saved.getId();
        }

        private ProductItemDTO productItemEntityToDTOMapper(ProductItem productItem) {
                Map<UUID, UUID> attMap = new HashMap<>();
                if (productItem.getVariantAttributes() != null) {
                        attMap = productItem.getVariantAttributes().stream()
                                        .collect(Collectors.toMap(
                                                        va -> va.getVariant().getId(),
                                                        VariantAttribute::getId));
                }
                List<ImageDTO> images = productItem.getImages().stream()
                                .map(img -> ImageDTO.builder()
                                                .url(buildFullUrl(img.getImgUrl()))
                                                .isThumbnail(img.getIsThumbnail())
                                                .build())
                                .toList();
                System.out.println("\nimages:" + images.size());
                return ProductItemDTO.builder()
                                .productItemId(productItem.getId())
                                .sku(productItem.getSku())
                                .avlStock(productItem.getAvailableStock())
                                .basePrice(productItem.getBasePrice())
                                .discountedPrice(productItem.getDiscountedPrice())
                                .imgUrls(images)
                                .attributes(attMap)
                                .build();
        }

        private String buildFullUrl(String key) {
                if (key.startsWith("http")) {
                        return key;
                }
                return s3PublicUrl + "/" + key;
        }

        private ProductItem getProductItem(UUID productItemId) {
                Optional<ProductItem> existing = productItemRepository.findWithDetails(productItemId);
                return existing
                                .orElseThrow(() -> new RuntimeException(
                                                "Product Item with ID: " + productItemId + " not exist"));
        }

        @Override
        public ProductItemDTO getProductItemById(UUID productItemId) {
                return productItemEntityToDTOMapper(getProductItem(productItemId));
        }

        @Override
        public Page<ProductItemListingDTO> getProductItemListing(UUID productId, Pageable pageable, String filter,
                        int page, int size,
                        String sortBy,
                        String direction) {
                productService.getProduct(productId);
                List<String> filtersList = new ArrayList<>();
                BigDecimal minPrice = BigDecimal.valueOf(0.0);
                BigDecimal maxPrice = BigDecimal.valueOf(100000000.0);
                // filter = Fragrances:Mint,Lavender::Size:OneSize
                if (filter != null && !filter.isBlank()) {
                        for (String attributesWithVariant : filter.split("::")) {
                                String[] parts = attributesWithVariant.split(":", 2); // limit = 2
                                if (parts.length == 2) {
                                        if (parts[0].equalsIgnoreCase("Price")) {
                                                maxPrice = new BigDecimal(parts[1].split(",")[1]);
                                                minPrice = new BigDecimal(parts[1].split(",")[0]);
                                        } else {
                                                for (String attribute : parts[1].split(",")) {
                                                        filtersList.add(attribute.trim());
                                                }
                                        }
                                }
                        }
                }
                System.out.println(filtersList.toString());
                boolean applyFilters = filtersList != null && !filtersList.isEmpty();
                Page<ProductItemFilter> sorted_items = productItemRepository.findProductItemsPage(
                                productId,
                                filtersList,
                                applyFilters,
                                minPrice,
                                maxPrice,
                                pageable);

                // List<ProductItem> fullData = productItemRepository.fetchDetails(
                // sorted_items.map(row -> row.getProductItemid()).toList());

                // Page<ProductItem> result = new PageImpl<>(fullData, pageable,
                // sorted_items.getTotalElements());

                return sorted_items.map((this::productItemFilterEntityToListingDTOMapper));
                // return null;
        }

        private ProductItemListingDTO productItemFilterEntityToListingDTOMapper(ProductItemFilter productItemFilter) {
                List<String> attributes = new ArrayList<>();
                if (productItemFilter.getAttributes() != null) {
                        // attributes = productItem.getVariantAttributes().stream()
                        // .map(va -> va.getName()).toList();
                        attributes = Arrays.asList(productItemFilter.getAttributes().split(","));
                }
                return ProductItemListingDTO.builder()
                                .productItemId(productItemFilter.getProductItemId())
                                .sku(productItemFilter.getSku())
                                .avlStock(productItemFilter.getAvailableStock())
                                .basePrice(productItemFilter.getBasePrice())
                                .discountedPrice(productItemFilter.getDiscountedPrice())
                                .imgUrl(productItemFilter.getImgUrl() != null
                                                ? buildFullUrl(productItemFilter.getImgUrl())
                                                : null)
                                .attributes(attributes)
                                .build();
        }

        // private ProductItemListingDTO productItemEntityToListingDTOMapper(ProductItem
        // productItem) {
        // List<String> attributes = new ArrayList<>();
        // if (productItem.getVariantAttributes() != null) {
        // // attributes = productItem.getVariantAttributes().stream()
        // // .map(va -> va.getName()).toList();
        // attributes =
        // }
        // String imageUrl = "";
        // if (productItem.getImages().size() > 0) {
        // for (ProductItemImage image : productItem.getImages()) {
        // if (image.getIsThumbnail()) {
        // imageUrl = buildFullUrl(image.getImgUrl());
        // }
        // }
        // }
        // return ProductItemListingDTO.builder()
        // .productItemId(productItem.getId())
        // .sku(productItem.getSku())
        // .avlStock(productItem.getAvailableStock())
        // .basePrice(productItem.getBasePrice())
        // .discountedPrice(productItem.getDiscountedPrice())
        // .imgUrl(imageUrl)
        // .attributes(attributes)
        // .build();
        // }

        @Override
        public void deleteProductItemById(UUID productItemId) {
                ProductItem productItem = getProductItem(productItemId);
                productItemRepository.delete(productItem);
        }
}
