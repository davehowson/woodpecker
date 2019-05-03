package com.davehowson.woodpecker.payload.note;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class NoteUpdateRequest extends NoteRequest {
    @NotNull
    private Long id;
}
