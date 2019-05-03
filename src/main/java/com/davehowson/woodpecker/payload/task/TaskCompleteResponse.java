package com.davehowson.woodpecker.payload.task;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class TaskCompleteResponse {

    @NotNull
    private long taskId;

    @NotNull
    private boolean status;

    @NotNull
    private String message;

}
