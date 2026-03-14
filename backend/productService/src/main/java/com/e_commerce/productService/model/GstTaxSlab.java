package com.e_commerce.productService.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "gst_tax_slab")
@Getter
@Setter
public class GstTaxSlab {

    @Id
    private String hsnCode;

    private BigDecimal gstRate;

    private String description;
}
