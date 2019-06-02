package com.davehowson.woodpecker.payload.bookmark;

import javax.validation.constraints.NotBlank;

public class CategoryRequest {
    @NotBlank
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
