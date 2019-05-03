package com.davehowson.woodpecker.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ReactController {
    Logger logger = LoggerFactory.getLogger(ReactController.class);

    @GetMapping
    public String index() {
        logger.error("Index route reached");
        return "index";
    }
}
