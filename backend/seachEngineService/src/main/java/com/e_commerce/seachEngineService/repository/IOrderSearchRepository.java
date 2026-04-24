package com.e_commerce.seachEngineService.repository;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import com.e_commerce.seachEngineService.model.OrderSearchDocument;
import java.util.UUID;

@Repository
public interface IOrderSearchRepository
        extends ElasticsearchRepository<OrderSearchDocument, UUID> {
}