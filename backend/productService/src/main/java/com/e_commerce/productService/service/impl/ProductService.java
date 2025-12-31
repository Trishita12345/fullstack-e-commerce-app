package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.Product;
import com.e_commerce.productService.model.dto.product.ProductDTO;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import com.e_commerce.productService.repository.IProductRepository;
import com.e_commerce.productService.service.ICategoryService;
import com.e_commerce.productService.service.IProductService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductService implements IProductService {
    private IProductRepository productRepository;
    private ICategoryService categoryService;


    @Override
    public Page<ProductListingResponseDTO> getAllProducts(String query, List<String> categories, Pageable pageable) {
        return productRepository.findAllProducts(query, categories, pageable);
    }

    @Override
    @Transactional
    public ProductDTO addProduct(ProductDTO productDTO) {
        Category category = categoryService.getCategory(productDTO.getCategoryId());
        Product newProduct = Product.builder()
                .name(productDTO.getProductName())
                .description(productDTO.getDescription())
                .features(productDTO.getFeature())
                .category(category)
                .build();
        Product savedProduct = productRepository.save(newProduct);
        return productToDTOMapper(savedProduct);
    }

    @Override
    public Product getProduct(UUID productId) {
        Optional<Product> existing = productRepository.findById(productId);
        return existing
                .orElseThrow(() ->
                        new RuntimeException("Product with ID: " + productId + " not exist"));
    }

    @Override
    public ProductDTO getProductById(UUID productId) {
        Product savedProduct = getProduct(productId);
        return productToDTOMapper(savedProduct);
    }

    @Override
    public ProductDTO editProductById(UUID productId, ProductDTO productDTO) {
        Product existingProduct = getProduct(productId);
        existingProduct.setName(productDTO.getProductName());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setFeatures(productDTO.getFeature());
        Product savedProduct = productRepository.save(existingProduct);
        return productToDTOMapper(savedProduct);
    }


    private static ProductDTO productToDTOMapper(Product savedProduct) {
        return ProductDTO.builder()
                .productId(savedProduct.getId())
                .productName(savedProduct.getName())
                .description(savedProduct.getDescription())
                .feature(savedProduct.getFeatures())
                .categoryId(savedProduct.getCategory().getId())
                .build();
    }
}
