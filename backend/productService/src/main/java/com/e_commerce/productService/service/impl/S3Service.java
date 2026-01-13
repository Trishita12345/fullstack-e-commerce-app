package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.service.IS3Service;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CopyObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.net.URI;
import java.time.Duration;

@Service
@AllArgsConstructor
public class S3Service implements IS3Service {

    private final String BUCKET_NAME = "loom-and-lume";

    private final S3Presigner presigner;
    private final S3Client s3Client;

    private final String s3PublicUrl = "https://loom-and-lume.s3.ap-south-1.amazonaws.com";

    public static String sanitizeFileName(String fileName) {
        return fileName
                .toLowerCase()
                .replaceAll("[^a-z0-9./-]", "-")
                .replaceAll("-+", "-");
    }

    @Override
    public String generateUploadUrl(String key, String contentType) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(sanitizeFileName(key))
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10))
                .putObjectRequest(objectRequest)
                .build();

        return presigner.presignPutObject(presignRequest).url().toString();
    }

    @Override
    public void deleteFromS3(String key) {

        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(key)
                .build();

        s3Client.deleteObject(request);
    }

    @Override
    public String moveFromTempToProducts(String tempUrl) {
        String sourceKey = extractKey(tempUrl);
        String destinationKey = sourceKey.replace("temp/", "products/");
        copyObject(sourceKey, destinationKey);
        deleteFromS3(sourceKey);
        return destinationKey;
    }

    private void copyObject(String sourceKey, String destinationKey) {

        CopyObjectRequest request = CopyObjectRequest.builder()
                .sourceBucket(BUCKET_NAME)
                .sourceKey(sourceKey)
                .destinationBucket(BUCKET_NAME)
                .destinationKey(destinationKey)
                .build();

        s3Client.copyObject(request);
    }

    @Override
    public String extractKey(String fileUrl) {
        return URI.create(fileUrl).getPath().substring(1);
    }

    @Override
    public String buildFullUrl(String key) {
        if (key.startsWith("http")) {
            return key;
        }
        return s3PublicUrl + "/" + key;
    }
}
