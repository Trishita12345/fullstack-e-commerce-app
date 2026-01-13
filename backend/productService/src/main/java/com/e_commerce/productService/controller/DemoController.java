package com.e_commerce.productService.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DemoController {

    @GetMapping("/public/hello")
    public Map<String, String> hello() {
        return Map.of("greetings", "hello ");
    }

}
