package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.BadRequestException;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.util.AppConstants;

public abstract class ServiceInterface {

    UserRepository userRepository;

    public ServiceInterface(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }


}
