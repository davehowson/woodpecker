package com.davehowson.woodpecker.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class TaskRequest implements TaggedRequest {
    @Size(max = 100)
    private String date;

    @NotBlank
    @Size(max = 200)
    private String description;

    @NotNull
    private List<String> tagNames;

    public LocalDate getDate() {
        return LocalDate.parse(date);
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public List<String> getTagNames() {
        return tagNames;
    }

    public void setTagNames(List<String> tagNames) {
        this.tagNames = tagNames;
    }
}
