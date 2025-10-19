package com.ecommerce.productService.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/authenticated/demo")
public class DemoController {

    @GetMapping
    public String demo() {
        return "Hello authenticated";
    }
}
