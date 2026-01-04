package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.Variant;
import com.e_commerce.productService.model.VariantAttribute;
import com.e_commerce.productService.model.dto.common.SelectOptionDTO;
import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;
import com.e_commerce.productService.model.dto.variant.VariantAttributeDTO;
import com.e_commerce.productService.model.dto.variant.VariantDTO;
import com.e_commerce.productService.model.dto.variant.VariantWithCategoryDTO;
import com.e_commerce.productService.repository.ICategoryRepository;
import com.e_commerce.productService.repository.IVariantRepository;
import com.e_commerce.productService.service.ICategoryService;
import com.e_commerce.productService.service.IVariantService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VariantService implements IVariantService {

        private IVariantRepository variantRepository;
        private ICategoryService categoryService;
        private ICategoryRepository categoryRepository;

        @Override
        @Transactional
        public VariantDTO addVariant(UUID categoryId, VariantDTO variantDTO) {
                Category category = categoryService.getCategory(categoryId);
                Variant variant = Variant.builder()
                                .name(variantDTO.getName())
                                .category(category)
                                .build();
                List<VariantAttribute> attributes = variantDTO.getAttributes()
                                .stream()
                                .map(dto -> VariantAttribute.builder()
                                                .name(dto.getName())
                                                .variant(variant)
                                                .build())
                                .toList();
                variant.setAttributes(attributes);
                Variant savedVariant = variantRepository.save(variant);
                return variantEntityToDTOMapper(savedVariant);
        }

        @Override
        @Transactional
        public VariantDTO editVariant(UUID categoryId, UUID variantId, VariantDTO variantDTO) {

                Variant variant = variantRepository.findById(variantId)
                                .orElseThrow(() -> new RuntimeException("Variant not found"));
                Category category = categoryService.getCategory(categoryId);
                variant.setCategory(category);
                variant.setName(variantDTO.getName());

                // Existing attributes map
                Map<UUID, VariantAttribute> existingAttributes = variant.getAttributes()
                                .stream()
                                .collect(Collectors.toMap(VariantAttribute::getId, Function.identity()));

                List<VariantAttribute> updatedAttributes = new ArrayList<>();

                for (VariantAttributeDTO dto : variantDTO.getAttributes()) {

                        // UPDATE existing
                        if (dto.getId() != null && existingAttributes.containsKey(dto.getId())) {
                                VariantAttribute attribute = existingAttributes.get(dto.getId());
                                attribute.setName(dto.getName());
                                updatedAttributes.add(attribute);
                        }
                        // CREATE new
                        else {
                                VariantAttribute newAttr = VariantAttribute.builder()
                                                .name(dto.getName())
                                                .variant(variant)
                                                .build();
                                updatedAttributes.add(newAttr);
                        }
                }

                // 2️⃣ Remove deleted attributes
                variant.getAttributes().clear();
                variant.getAttributes().addAll(updatedAttributes);

                Variant savedVariant = variantRepository.save(variant);

                return variantEntityToDTOMapper(savedVariant);
        }

        @Override
        public List<ProductVariantAttributesDTO> getVariantsByCategoryId(UUID categoryId) {

                List<UUID> categoryIds = categoryService.getCategoryHierarchy(
                                categoryService.getCategory(categoryId)).stream().map(Category::getId).toList();

                List<Object[]> rows = variantRepository.findVariantAttributesByCategoryIds(categoryIds);

                Map<UUID, ProductVariantAttributesDTO> result = new LinkedHashMap<>();

                for (Object[] row : rows) {
                        UUID variantId = (UUID) row[0];
                        String variantName = (String) row[1];
                        UUID attributeId = (UUID) row[2];
                        String attributeName = (String) row[3];

                        ProductVariantAttributesDTO dto = result.get(variantId);

                        if (dto == null) {
                                dto = ProductVariantAttributesDTO.builder()
                                                .variantId(variantId)
                                                .variantName(variantName)
                                                .attributes(new ArrayList<>())
                                                .build();
                                result.put(variantId, dto);
                        }

                        dto.getAttributes()
                                        .add(new SelectOptionDTO<>(attributeName, attributeId));
                }

                return new ArrayList<>(result.values());
        }

        @Override
        public Page<VariantWithCategoryDTO> getVariantsByCategoryId(UUID categoryId, String query, Pageable pageable) {
                Category category = categoryService.getCategory(categoryId);
                List<Category> categoryHierarchy = categoryService.getCategoryHierarchy(category);
                List<UUID> categoryHierarchyIds = categoryHierarchy.stream().map(Category::getId).toList();

                Page<VariantWithCategoryDTO> allVariants;
                if (query == null || query.trim().isEmpty()) {
                        // No search query → return all
                        allVariants = variantRepository.findVariantsByCategoryIds(categoryHierarchyIds, pageable);
                } else {
                        // Search by name or details
                        allVariants = variantRepository.findByNameContainingIgnoreCaseByCategoryIds(query,
                                        categoryHierarchyIds, pageable);
                }
                return allVariants;
        }

        @Override
        public Page<VariantWithCategoryDTO> getAllVariants(String query, String filter, Pageable pageable) {
                List<String> categories = new ArrayList<>();
                if (filter != null && !filter.isBlank()) {
                        for (String category : filter.split(":")[1].split(",")) {
                                categories.add(category);
                        }
                }
                List<UUID> existingCategories = categoryRepository.findByNameIn(categories).stream()
                                .map((c) -> c.getId()).toList();
                Page<VariantWithCategoryDTO> allVariants;
                if (query == null || query.trim().isEmpty()) {
                        // No search query → return all
                        allVariants = variantRepository.findVariantsByCategoryIds(existingCategories, pageable);
                } else {
                        // Search by name or details
                        allVariants = variantRepository.findByNameContainingIgnoreCaseByCategoryIds(query,
                                        existingCategories, pageable);
                }
                return allVariants;
        }

        @Override
        public VariantDTO getVariantDetails(UUID variantId) {
                return variantEntityToDTOMapper(getVariant(variantId));
        }

        public Variant getVariant(UUID id) {
                Optional<Variant> existing = variantRepository.findById(id);
                return existing
                                .orElseThrow(() -> new RuntimeException("Variant with ID: " + id + " not exist"));
        }

        private static VariantDTO variantEntityToDTOMapper(Variant savedVariant) {
                return VariantDTO.builder()
                                .id(savedVariant.getId())
                                .name((savedVariant.getName()))
                                .attributes(savedVariant
                                                .getAttributes()
                                                .stream()
                                                .map(variantAttribute -> VariantAttributeDTO
                                                                .builder()
                                                                .id(variantAttribute.getId())
                                                                .name(variantAttribute.getName())
                                                                .build())
                                                .toList())
                                .build();
        }
}
