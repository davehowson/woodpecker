package com.davehowson.woodpecker.payload.bookmark;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class BookmarkUpdateRequest extends BookmarkRequest {
    @NotNull
    private Long id;
}
