package com.davehowson.woodpecker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final long MAX_AGE_SECS = 3600;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
                .maxAge(MAX_AGE_SECS);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\w+}")
                .setViewName("forward:/");
        registry.addViewController("/app/{spring:\\w+}")
                .setViewName("forward:/");
        registry.addViewController("/app/**/{spring:\\w+}")
                .setViewName("forward:/");
        registry.addViewController("/app/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/");
    }


}
