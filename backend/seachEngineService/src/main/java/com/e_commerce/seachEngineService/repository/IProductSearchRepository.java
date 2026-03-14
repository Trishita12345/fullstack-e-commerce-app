package com.e_commerce.seachEngineService.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.e_commerce.seachEngineService.model.ProductSearchDocument;

import java.util.UUID;

@Repository
public interface IProductSearchRepository
                extends ElasticsearchRepository<ProductSearchDocument, UUID> {
}