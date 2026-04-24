package com.e_commerce.productService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.productService.model.GstTaxSlab;

public interface IGstTaxSlabRepository extends JpaRepository<GstTaxSlab, String> {

}
