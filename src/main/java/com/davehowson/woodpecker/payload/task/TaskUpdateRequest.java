package com.davehowson.woodpecker.payload.task;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class TaskUpdateRequest extends TaskRequest {
    @NotNull
    private Long id;

    private Boolean complete;
}
