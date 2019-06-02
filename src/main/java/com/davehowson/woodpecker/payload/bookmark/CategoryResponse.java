package com.davehowson.woodpecker.payload.bookmark;

import com.davehowson.woodpecker.payload.user.UserSummary;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class CategoryResponse {
    private Long id;
    private String name;
    private UserSummary createdBy;
}
