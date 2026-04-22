package com.e_commerce.seachEngineService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

@ComponentScan(basePackages = {
		"com.e_commerce.seachEngineService",
		"com.e_commerce.common"
})

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
// as we are not using any relational database in this service, we can exclude
// the datasource auto configuration to avoid any unnecessary configuration and
// potential errors related to datasource.
public class SeachEngineServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeachEngineServiceApplication.class, args);
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
