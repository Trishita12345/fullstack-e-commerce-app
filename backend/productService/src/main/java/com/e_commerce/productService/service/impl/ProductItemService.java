package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.Product;
import com.e_commerce.productService.model.ProductItem;
import com.e_commerce.productService.model.ProductItemImage;
import com.e_commerce.productService.model.VariantAttribute;
import com.e_commerce.productService.model.dto.customer.ProductDetailsDTO;
import com.e_commerce.productService.model.dto.customer.ProductVariantAttributeDTO;
import com.e_commerce.productService.model.dto.customer.VariantAttributeDTO;
import com.e_commerce.productService.model.dto.productItem.ImageDTO;
import com.e_commerce.productService.model.dto.productItem.ProductItemDTO;
import com.e_commerce.productService.model.dto.productItem.ProductItemFilter;
import com.e_commerce.productService.model.dto.productItem.ProductItemListingDTO;
import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;
import com.e_commerce.productService.repository.IProductItemImageRepository;
import com.e_commerce.productService.repository.IProductItemRepository;
import com.e_commerce.productService.repository.IVariantAttributeRepository;
import com.e_commerce.productService.service.IProductItemService;
import com.e_commerce.productService.service.IProductService;
import com.e_commerce.productService.service.IS3Service;
import com.e_commerce.productService.service.IVariantService;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
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

        private final IProductService productService;
        private final IVariantService variantService;
        private final IVariantAttributeRepository variantAttributeRepository;
        private final IProductItemRepository productItemRepository;
        private final IProductItemImageRepository productItemImageRepository;
        private final IS3Service s3Service;

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
                Set<VariantAttribute> attributes = variantAttributeRepository
                                .findByNameIn(new HashSet<>(dto.getAttributes().values()));
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
                Map<String, String> attMap = new HashMap<>();
                if (productItem.getVariantAttributes() != null) {
                        attMap = productItem.getVariantAttributes().stream()
                                        .collect(Collectors.toMap(
                                                        va -> va.getVariant().getName(),
                                                        VariantAttribute::getName));
                }
                List<ImageDTO> images = productItem.getImages().stream()
                                .map(img -> ImageDTO.builder()
                                                .url(s3Service.buildFullUrl(img.getImgUrl()))
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

                return sorted_items.map((this::productItemFilterEntityToListingDTOMapper));
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
                                                ? s3Service.buildFullUrl(productItemFilter.getImgUrl())
                                                : null)
                                .attributes(attributes)
                                .build();
        }

        @Override
        public void deleteProductItemById(UUID productItemId) {
                ProductItem productItem = getProductItem(productItemId);
                productItemRepository.delete(productItem);
        }

        @Override
        @Transactional
        public ProductItemDTO editProductById(UUID productItemId, ProductItemDTO productItemDTO) {
                ProductItem productItem = getProductItem(productItemId);
                productItem.setSku(productItemDTO.getSku());
                productItem.setAvailableStock(productItemDTO.getAvlStock());
                productItem.setBasePrice(productItemDTO.getBasePrice());
                productItem.setDiscountedPrice(productItemDTO.getDiscountedPrice());

                // Clear existing Variant Attribute from both side
                for (VariantAttribute va : productItem.getVariantAttributes()) {
                        va.getProductItems().remove(productItem);
                }
                productItem.getVariantAttributes().clear();

                Set<String> attributeNames = new HashSet<>(productItemDTO.getAttributes().values());
                Set<VariantAttribute> newAttributes = new HashSet<>(
                                variantAttributeRepository.findByNameIn(attributeNames));

                // Add Variant Attribute from both side
                for (VariantAttribute va : newAttributes) {
                        va.getProductItems().add(productItem);
                }
                productItem.setVariantAttributes(newAttributes);

                List<ProductItemImage> existingImages = new ArrayList<>(productItem.getImages());
                List<ImageDTO> currentImages = productItemDTO.getImgUrls();

                List<ProductItemImage> newImages = currentImages.stream()
                                .filter(img -> img.getUrl().contains("temp/"))
                                .map(img -> {
                                        String finalKey = s3Service.moveFromTempToProducts(img.getUrl());
                                        return ProductItemImage.builder()
                                                        .imgUrl(finalKey)
                                                        .isThumbnail(img.getIsThumbnail())
                                                        .productItem(productItem)
                                                        .build();
                                }).toList();

                List<ProductItemImage> imgToBeDeleted = new ArrayList<>();
                List<ProductItemImage> imgToBeRetained = new ArrayList<>();
                imgToBeRetained.addAll(newImages);
                List<ImageDTO> imageDTOinDB = currentImages.stream()
                                .filter(newImageFromDTO -> newImageFromDTO.getUrl().contains("products/")).toList();
                for (ProductItemImage existingImg : existingImages) {
                        Optional<ImageDTO> existing = imageDTOinDB.stream()
                                        .filter(newImageFromDTO -> s3Service.extractKey(newImageFromDTO.getUrl())
                                                        .equals(existingImg.getImgUrl()))
                                        .findFirst();
                        if (existing.isPresent()) {
                                existingImg.setIsThumbnail(existing.get().getIsThumbnail());
                                imgToBeRetained.add(existingImg);
                        } else {
                                imgToBeDeleted.add(existingImg);
                                s3Service.deleteFromS3(existingImg.getImgUrl());
                        }
                }
                productItem.getImages().clear();
                productItemImageRepository.deleteAll(imgToBeDeleted);
                productItem.getImages().addAll(imgToBeRetained);

                ProductItem saved = productItemRepository.save(productItem);
                return productItemEntityToDTOMapper(saved);
        }

        @Override
        public ProductDetailsDTO getProductDetailsByProductItemId(UUID productItemId) {
                ProductDetailsDTO productDetailsDTO = productItemRepository.findProductDetailsById(productItemId);
                productDetailsDTO
                                .setImgUrls(productItemImageRepository.findProductImagesByProductItemId(productItemId)
                                                .stream().map(imgUrl -> s3Service.buildFullUrl(imgUrl)).toList());
                List<Object[]> rows = productItemRepository
                                .findVariantAttributeByProductId(productDetailsDTO.getProductId());
                System.out.println(rows.toString());
                Map<String, Map<String, UUID>> outerMap = new HashMap<>();
                for (Object[] row : rows) {
                        String variantName = (String) row[0];
                        String attributeName = (String) row[1];
                        UUID productItem = (UUID) row[2];
                        if (outerMap.containsKey(variantName)) {
                                if (!outerMap.get(variantName).containsKey(attributeName)) {
                                        outerMap.get(variantName).put(attributeName, productItem);
                                }
                        } else {

                                outerMap.put(variantName, new HashMap<>() {
                                        {
                                                put(attributeName, productItem);
                                        }
                                });
                        }
                }
                List<ProductVariantAttributeDTO> pva = new ArrayList<>();
                outerMap.forEach((outerKey, outerValue) -> {
                        List<VariantAttributeDTO> va = new ArrayList<>();
                        outerValue.forEach((innerKey, innerValue) -> {
                                va.add(VariantAttributeDTO.builder()
                                                .name(innerKey)
                                                .productItemId(innerValue)
                                                .build());
                        });
                        pva.add(ProductVariantAttributeDTO
                                        .builder()
                                        .variantName(outerKey)
                                        .attributes(va)
                                        .build());
                });
                productDetailsDTO.setVariantAttributes(pva);
                return productDetailsDTO;
        }
}
