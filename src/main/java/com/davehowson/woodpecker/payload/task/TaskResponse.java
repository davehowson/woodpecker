package com.davehowson.woodpecker.payload.task;

import com.davehowson.woodpecker.payload.user.UserSummary;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class TaskResponse {
    private Long id;
    private LocalDate date;
    private LocalTime time;
    private String description;
    private String tag;
    private UserSummary createdBy;
    private Instant creationDateTime;
    private Boolean complete;
}
