package com.e_commerce.offerService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.e_commerce.offerService",
		"com.e_commerce.common"
})
public class OfferServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OfferServiceApplication.class, args);
	}

}
