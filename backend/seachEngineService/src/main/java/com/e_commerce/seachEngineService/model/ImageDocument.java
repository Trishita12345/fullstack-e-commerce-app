package com.e_commerce.seachEngineService.model;

import org.springframework.data.elasticsearch.annotations.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ImageDocument {

    @Field
    private String imgUrl;

    @Field
    private Boolean isThumbnail;
}
