package com.e_commerce.productService.controller;

import com.e_commerce.productService.model.dto.s3.ImageKey;
import com.e_commerce.productService.model.dto.s3.PresignRequest;
import com.e_commerce.productService.service.IS3Service;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/s3")
public class S3Controller {
    private final IS3Service s3Service;

    @PostMapping("/presign")
    public ResponseEntity<Map<String, String>> getPresignedUrl(@RequestBody PresignRequest req) {
        String url = s3Service.generateUploadUrl(req.getKey(), req.getContentType());
        return ResponseEntity.ok(Map.of("url", url));
    }

    @DeleteMapping("/images")
    public ResponseEntity<Void> deleteImage(@RequestBody ImageKey key) {
        String decodedKey = URLDecoder.decode(key.getKey(), StandardCharsets.UTF_8);
        s3Service.deleteFromS3(decodedKey);
        return ResponseEntity.noContent().build();
    }

}
