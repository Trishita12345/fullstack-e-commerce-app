package com.e_commerce.productService.service;

public interface IS3Service {
    String generateUploadUrl(String key, String contentType);

    void deleteFromS3(String key);

    String moveFromTempToProducts(String tempUrl);

    String extractKey(String fileUrl);

    String buildFullUrl(String key);

}
