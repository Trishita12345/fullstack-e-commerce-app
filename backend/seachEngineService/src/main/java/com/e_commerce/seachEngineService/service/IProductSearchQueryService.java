package com.e_commerce.seachEngineService.service;

import com.e_commerce.seachEngineService.model.dto.ProductSearchRequest;
import com.e_commerce.seachEngineService.model.dto.ProductSearchResponse;

public interface IProductSearchQueryService {

    ProductSearchResponse search(ProductSearchRequest request);

}
