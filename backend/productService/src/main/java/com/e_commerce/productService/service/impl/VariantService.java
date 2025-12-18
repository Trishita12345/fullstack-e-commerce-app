package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.Variant;
import com.e_commerce.productService.model.VariantAttribute;
import com.e_commerce.productService.model.dto.variant.VariantAttributeDTO;
import com.e_commerce.productService.model.dto.variant.VariantDTO;
import com.e_commerce.productService.model.dto.variant.VariantWithCategoryDTO;
import com.e_commerce.productService.repository.IVariantAttributeRepository;
import com.e_commerce.productService.repository.IVariantRepository;
import com.e_commerce.productService.service.ICategoryService;
import com.e_commerce.productService.service.IVariantService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VariantService implements IVariantService {

    private IVariantRepository variantRepository;
    private ICategoryService categoryService;
    private IVariantAttributeRepository variantAttributeRepository;

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
                        .build()
                )
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

        // 1️⃣ Validate variant belongs to category
        if (!variant.getCategory().getId().equals(categoryId)) {
            throw new IllegalStateException("Variant does not belong to this category");
        }

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
    public List<VariantWithCategoryDTO> getVariantsByCategoryId(UUID categoryId) {
        Category category = categoryService.getCategory(categoryId);
        List<Category> categoryHierarchy = categoryService.getCategoryHierarchy(category);
        List<UUID> categoryHierarchyIds = categoryHierarchy.stream().map(Category::getId).toList();
        return variantRepository.findVariantsByCategoryIds(categoryHierarchyIds);
    }

    @Override
    public VariantDTO getVariantDetails(UUID variantId) {
        return variantEntityToDTOMapper(getVariant(variantId));
    }

    public Variant getVariant(UUID id) {
        Optional<Variant> existing = variantRepository.findById(id);
        return existing
                .orElseThrow(() ->
                        new RuntimeException("Variant with ID: " + id + " not exist"));
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
