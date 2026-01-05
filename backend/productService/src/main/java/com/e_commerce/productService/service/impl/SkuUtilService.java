package com.e_commerce.productService.service.impl;

import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.e_commerce.productService.repository.IProductItemImageRepository;
import com.e_commerce.productService.repository.IProductItemRepository;
import com.e_commerce.productService.repository.IProductRepository;
import com.e_commerce.productService.service.IProductService;
import com.e_commerce.productService.service.ISkuUtilService;

import lombok.AllArgsConstructor;

/**
 * Central SKU utility
 * - SKU generation
 * - SKU encoding / decoding
 * - DB uniqueness check
 * - Product name lookup via productId
 */
@Service
@AllArgsConstructor
public class SkuUtilService implements ISkuUtilService {

    private final IProductService productService;
    private final IProductItemRepository productItemRepository;

    /* ===================== CONSTANTS ===================== */

    private static final Set<String> STOP_WORDS = Set.of(
            "FOR", "AND", "THE", "OF", "WITH", "IN", "ON");

    // Units are preserved AS-IS (NO conversion)
    private static final Pattern UNIT_PATTERN = Pattern.compile("(GM|KG|ML|L|PCS|PC)$");

    private static final int MAX_RETRY = 5;

    /* ===================== PUBLIC API ===================== */

    /**
     * Generate unique SKU for a product item
     */
    @Override
    public String generateUniqueSku(
            UUID productId,
            Map<String, String> variants) {
        String productName = productService.getProduct(productId).getName();
        String productKey = generateProductKey(productName);
        String variantPart = buildVariantPart(variants);
        for (int attempt = 0; attempt < MAX_RETRY; attempt++) {

            String sku = productKey +
                    (variantPart.isEmpty() ? "" : "-" + variantPart) +
                    "-" + generate5DigitNumber();

            if (!productItemRepository.existsBySku(sku)) {
                return sku;
            }
        }

        throw new IllegalStateException("Unable to generate unique SKU after retries");
    }

    /**
     * Decode a SKU token back to readable value
     * Example: DARK_BLUE -> Dark Blue
     */
    public static String decodeSkuToken(String token) {
        if (token == null || token.isBlank())
            return "";

        return Arrays.stream(token.split("_"))
                .map(word -> word.substring(0, 1) +
                        word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    private static String generateProductKey(String productName) {
        if (productName == null || productName.isBlank()) {
            throw new IllegalArgumentException("Product name cannot be empty");
        }

        String key = Arrays.stream(productName.toUpperCase().split("\\s+"))
                .filter(word -> !STOP_WORDS.contains(word))
                .map(word -> word.substring(0, 1))
                .collect(Collectors.joining());

        return key.substring(0, Math.min(6, key.length()));
    }

    private static String buildVariantPart(Map<String, String> variants) {
        if (variants == null || variants.isEmpty())
            return "";

        return variants.values()
                .stream()
                .filter(Objects::nonNull)
                .map(SkuUtilService::encodeVariantValue)
                .collect(Collectors.joining("-"));
    }

    /**
     * Encode variant value into SKU-safe token
     */
    private static String encodeVariantValue(String value) {
        String compact = value.toUpperCase().replaceAll("\\s+", "");

        // Preserve units AS-IS (200GM, 1L, 3PCS)
        if (UNIT_PATTERN.matcher(compact).find()) {
            return encodeUnit(value);
        }
        return encodeText(value);
    }

    /**
     * Encode general text
     * Example: "Dark Blue" -> "DARK_BLUE"
     */
    private static String encodeText(String value) {
        return value.trim()
                .toUpperCase()
                .replaceAll("\\s+", "_")
                .replaceAll("[^A-Z0-9_]", "");
    }

    /**
     * Encode unit value without conversion
     * Example: "200 gm" -> "200GM"
     */
    private static String encodeUnit(String value) {
        return value.toUpperCase()
                .replaceAll("\\s+", "")
                .replaceAll("[^A-Z0-9]", "");
    }

    private static String generate5DigitNumber() {
        return String.valueOf(10000 + new Random().nextInt(90000));
    }
}
