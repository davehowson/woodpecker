package com.davehowson.woodpecker.payload.bookmark;

import com.davehowson.woodpecker.model.Category;
import com.davehowson.woodpecker.payload.user.UserSummary;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class BookmarkResponse {
    private Long id;
    private String name;
    private String url;
    private UserSummary createdBy;
    private Long category;
    private Instant creationDateTime;
}
