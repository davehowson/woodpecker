package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.BadRequestException;
import com.davehowson.woodpecker.repository.TagRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.util.AppConstants;

public abstract class TaggedService {

    TagRepository tagRepository;
    UserRepository userRepository;

    public TaggedService(TagRepository tagRepository, UserRepository userRepository) {
        this.tagRepository = tagRepository;
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
