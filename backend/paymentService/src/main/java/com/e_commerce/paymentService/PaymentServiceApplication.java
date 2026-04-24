package com.e_commerce.paymentService;

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

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.e_commerce.paymentService",
		"com.e_commerce.common"
})
@EnableFeignClients
@EnableKafka
public class PaymentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentServiceApplication.class, args);
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
