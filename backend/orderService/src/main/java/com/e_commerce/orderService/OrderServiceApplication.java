package com.e_commerce.orderService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.e_commerce.orderService",
		"com.e_commerce.common"
})
@EnableFeignClients
@EnableScheduling
@EnableKafka
public class OrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderServiceApplication.class, args);
	}

	@Bean
	public KafkaTemplate<String, Object> kafkaTemplate(
			ProducerFactory<String, Object> producerFactory) {

		KafkaTemplate<String, Object> kafkaTemplate = new KafkaTemplate<>(producerFactory);
		kafkaTemplate.setObservationEnabled(true);
		return kafkaTemplate;
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
