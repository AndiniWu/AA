package com.tim3.ois;


import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class OisApplication {

	public static void main(String[] args) {
		ApplicationContext appContext = SpringApplication.run(OisApplication.class, args);
		for (String name : appContext.getBeanDefinitionNames()) {
			System.out.println("name: " + name);
		}
	}

}
