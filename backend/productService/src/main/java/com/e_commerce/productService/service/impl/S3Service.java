package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.service.IS3Service;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;

@Service
@AllArgsConstructor
public class S3Service implements IS3Service {

    public static final String LOOM_AND_LUME = "loom-and-lume";
    private final S3Presigner presigner;
    private final S3Client s3Client;

    @Override
    public String generateUploadUrl(String key, String contentType) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(LOOM_AND_LUME)
                .key(key)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest =
                PutObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(10))
                        .putObjectRequest(objectRequest)
                        .build();

        return presigner.presignPutObject(presignRequest).url().toString();
    }

    @Override
    public void deleteFromS3(String key) {
        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(LOOM_AND_LUME)
                .key(key)
                .build();

        s3Client.deleteObject(request);
    }

}

