package com.e_commerce.productService.cron;

import org.springframework.stereotype.Component;

import com.e_commerce.productService.repository.IProductItemRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductIndexJob {

    private final IProductItemRepository productItemRepository;

}
