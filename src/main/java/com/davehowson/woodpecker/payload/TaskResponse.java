package com.davehowson.woodpecker.payload;

import com.davehowson.woodpecker.model.Tag;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class TaskResponse {
    private Long id;
    private LocalDate date;
    private String description;
    private Set<Tag> tags;
    private UserSummary createdBy;
    private Instant creationDateTime;
    private Boolean isComplete;
}
