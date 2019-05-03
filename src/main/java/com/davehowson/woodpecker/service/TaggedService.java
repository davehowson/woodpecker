package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.AppException;
import com.davehowson.woodpecker.exception.BadRequestException;
import com.davehowson.woodpecker.model.Tag;
import com.davehowson.woodpecker.model.TagName;
import com.davehowson.woodpecker.payload.ApiRequest;
import com.davehowson.woodpecker.repository.TagRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.util.AppConstants;

import java.util.HashSet;
import java.util.Set;

public abstract class TaggedService {

    private TagRepository tagRepository;
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


    Set<Tag> mapTags(ApiRequest apiRequest) {
        Set<Tag> tags = new HashSet<>();
        apiRequest.getTagNames().forEach((v) -> {
            try {
                Tag tag  = tagRepository.findByName(TagName.valueOf(v)).orElseThrow(() -> new AppException("Tag not found"));
                tags.add(tag);
            } catch (IllegalArgumentException ex) {
                throw new AppException("Tag not found");
            }
        });
        return tags;
    }
}
