package com.davehowson.woodpecker.payload;

import com.davehowson.woodpecker.model.Tag;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class NoteResponse {
    private Long id;
    private String title;
    private String description;
    private Set<Tag> tags;
    private UserSummary createdBy;
    private Instant creationDateTime;
}
