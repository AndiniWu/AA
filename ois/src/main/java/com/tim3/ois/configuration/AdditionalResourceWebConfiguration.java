package com.tim3.ois.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AdditionalResourceWebConfiguration implements WebMvcConfigurer {


    @Value("${static.path}")
    private String staticPath;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        if(staticPath != null) {
            registry.addResourceHandler("/img/**")
                    .addResourceLocations("file:" + staticPath);
        }
    }

}