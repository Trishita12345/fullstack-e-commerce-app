package com.e_commerce.seachEngineService.service.impl;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchAggregation;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchAggregations;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import com.e_commerce.seachEngineService.model.ProductSearchDocument;
import com.e_commerce.seachEngineService.model.dto.ProductSearchRequest;
import com.e_commerce.seachEngineService.model.dto.ProductSearchResponse;
import com.e_commerce.seachEngineService.service.IProductSearchQueryService;

import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.PageImpl;
import com.e_commerce.seachEngineService.model.dto.FacetValueDTO;

@Service
@AllArgsConstructor
public class ProductSearchQueryService implements IProductSearchQueryService {

        private final ElasticsearchOperations elasticsearchOperations;

        @Override
        public ProductSearchResponse search(ProductSearchRequest request) {

                BoolQuery.Builder boolQuery = new BoolQuery.Builder();

                /* ---------- SEARCH ---------- */

                if (request.getKeyword() != null) {

                        boolQuery.must(m -> m
                                        .match(match -> match
                                                        .field("productName")
                                                        .query(request.getKeyword())
                                                        .fuzziness("AUTO")));
                }

                /* ---------- CATEGORY FILTER ---------- */

                if (request.getCategory() != null) {

                        boolQuery.filter(f -> f
                                        .term(t -> t
                                                        .field("category")
                                                        .value(request.getCategory().toString())));
                }

                /* ---------- PRICE RANGE ---------- */

                if (request.getMinPrice() != null || request.getMaxPrice() != null) {

                        boolQuery.filter(f -> f
                                        .range(r -> r
                                                        .number(n -> n
                                                                        .field("sellingPrice")
                                                                        .gte(request.getMinPrice())
                                                                        .lte(request.getMaxPrice()))));
                }

                /* ---------- STOCK ---------- */

                if (request.getInStock() != null) {

                        boolQuery.filter(f -> f
                                        .term(t -> t
                                                        .field("inStock")
                                                        .value(request.getInStock())));
                }

                /* ---------- VARIANT FILTERS ---------- */

                request.getVariants().forEach((name, values) -> {

                        boolQuery.filter(f -> f.nested(n -> n
                                        .path("variants")
                                        .query(q -> q.bool(b -> {

                                                // must match variant name
                                                b.must(m -> m.term(t -> t
                                                                .field("variants.name")
                                                                .value(name)));

                                                // OR condition for multiple values
                                                b.must(m -> m.bool(inner -> {
                                                        values.forEach(val -> inner.should(s -> s.term(t -> t
                                                                        .field("variants.value")
                                                                        .value(val))));
                                                        inner.minimumShouldMatch("1");
                                                        return inner;
                                                }));

                                                return b;
                                        }))));
                });
                /* ---------- DISCOUNT FILTER ---------- */

                if (request.getDiscount() != null) {

                        boolQuery.filter(f -> f
                                        .range(r -> r
                                                        .number(n -> n
                                                                        .field("discountPercentage")
                                                                        .gte(request.getDiscount()))));
                }

                /* ---------- DYNAMIC AGGREGATION ---------- */

                Aggregation variantAggregation = Aggregation.of(a -> a
                                .nested(n -> n.path("variants"))
                                .aggregations("variant_names",
                                                Aggregation.of(t -> t
                                                                .terms(ts -> ts.field("variants.name"))
                                                                .aggregations("variant_values",
                                                                                Aggregation.of(v -> v
                                                                                                .terms(tt -> tt.field(
                                                                                                                "variants.value")))))));

                NativeQueryBuilder queryBuilder = NativeQuery.builder()
                                .withQuery(boolQuery.build()._toQuery())
                                .withPageable(PageRequest.of(request.getPage(), request.getSize()))
                                .withAggregation("variants", variantAggregation);

                /* ---------- sorting ----------- */

                if (request.getSortBy() != null) {
                        String field = switch (request.getSortBy()) {
                                case "price" -> "sellingPrice";
                                case "popularity" -> "purchaseCount";
                                case "trending" -> "trendingScore";
                                // case "rating" -> "rating";
                                // case "featured" -> "rankingBoost";
                                case "createdAt" -> "createdAt";
                                default -> null;
                        };
                        if (field != null) {
                                queryBuilder.withSort(s -> s
                                                .field(f -> f
                                                                .field(field)
                                                                .order(request.isAsc()
                                                                                ? SortOrder.Asc
                                                                                : SortOrder.Desc)));
                        }
                }

                NativeQuery query = queryBuilder.build();

                SearchHits<ProductSearchDocument> hits = elasticsearchOperations.search(query,
                                ProductSearchDocument.class);

                return buildResponse(hits, request.getPage(), request.getSize());
        }

        private ProductSearchResponse buildResponse(SearchHits<ProductSearchDocument> hits, int pageNumber, int size) {
                // Extract products from search hits
                List<ProductSearchDocument> products = hits.stream()
                                .map(SearchHit::getContent)
                                .toList();

                // Create PageImpl with pagination info
                PageImpl<ProductSearchDocument> page = new PageImpl<>(
                                products,
                                PageRequest.of(pageNumber, size),
                                hits.getTotalHits());

                // Extract and process aggregations for facets
                Map<String, List<FacetValueDTO>> facets = new HashMap<>();

                Map<String, ElasticsearchAggregation> aggregations = ((ElasticsearchAggregations) hits
                                .getAggregations())
                                .aggregationsAsMap();

                if (aggregations.containsKey("variants")) {
                        ElasticsearchAggregation variantAgg = aggregations.get("variants");
                        // Process variant aggregations and convert to facets
                        Map<String, List<FacetValueDTO>> variantFacets = processVariantAggregations(variantAgg);
                        facets.putAll(variantFacets);
                }

                // Build and return response
                return ProductSearchResponse.builder()
                                .products(page)
                                .facets(facets)
                                .total(page.getTotalElements())
                                .build();
        }

        private Map<String, List<FacetValueDTO>> processVariantAggregations(ElasticsearchAggregation variantAgg) {

                Map<String, List<FacetValueDTO>> facets = new HashMap<>();

                variantAgg.aggregation()
                                .getAggregate()
                                .nested()
                                .aggregations()
                                .get("variant_names")
                                .sterms()
                                .buckets()
                                .array()
                                .forEach(nameBucket -> {

                                        String variantName = nameBucket.key().stringValue();

                                        List<FacetValueDTO> values = new ArrayList<>();

                                        nameBucket.aggregations()
                                                        .get("variant_values")
                                                        .sterms()
                                                        .buckets()
                                                        .array()
                                                        .forEach(valueBucket -> {

                                                                values.add(
                                                                                new FacetValueDTO(
                                                                                                valueBucket.key()
                                                                                                                .stringValue(),
                                                                                                valueBucket.docCount()));
                                                        });

                                        facets.put(variantName, values);
                                });

                return facets;
        }

}
