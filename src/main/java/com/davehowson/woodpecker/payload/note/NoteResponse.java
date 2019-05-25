package com.davehowson.woodpecker.payload.note;

import com.davehowson.woodpecker.model.Tag;
import com.davehowson.woodpecker.payload.user.UserSummary;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Set;

@Getter
@Setter
public class NoteResponse {
    private Long id;
    private String title;
    private String description;
    private String tag;
    private Boolean important;
    private UserSummary createdBy;
    private Instant creationDateTime;
}
