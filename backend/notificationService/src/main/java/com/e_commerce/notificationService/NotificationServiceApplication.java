package com.e_commerce.notificationService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;

@SpringBootApplication
@EnableKafka
@ComponentScan(basePackages = {
		"com.e_commerce.notificationService",
		"com.e_commerce.common"
})
public class NotificationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationServiceApplication.class, args);
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, Object> kafkaListenerContainerFactory(
			ConsumerFactory<String, Object> consumerFactory) {

		ConcurrentKafkaListenerContainerFactory<String, Object> factory = new ConcurrentKafkaListenerContainerFactory<>();

		factory.setConsumerFactory(consumerFactory);
		factory.getContainerProperties().setObservationEnabled(true);

		return factory;
	}

}
