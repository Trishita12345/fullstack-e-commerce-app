package com.e_commerce.profileService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.e_commerce.profileService",
		"com.e_commerce.common"
})
public class ProfileServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProfileServiceApplication.class, args);
	}

	@Bean
	public KafkaTemplate<String, Object> kafkaTemplate(
			ProducerFactory<String, Object> producerFactory) {

		KafkaTemplate<String, Object> kafkaTemplate = new KafkaTemplate<>(producerFactory);
		kafkaTemplate.setObservationEnabled(true);
		return kafkaTemplate;
	}

}
