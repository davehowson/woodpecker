package com.davehowson.woodpecker.payload.task;


import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

public class TaskRequest {
    @Size(max = 100)
    private String date;

    @Size(max = 100)
    private String time;

    @NotBlank
    @Size(max = 200)
    private String description;

    @Nullable
    private String tag;

    private Boolean important;

    public LocalDate getDate() {
        if (date == null) {
            return null;
        }
        return LocalDate.parse(date);
    }

    public void setDate(String date) {
        this.date = date;
    }

    public LocalTime getTime() {
        if (time == null) {
            return null;
        }

        return LocalTime.parse(time);
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Boolean getImportant() {
        return important;
    }

    public void setImportant(Boolean important) {
        this.important = important;
    }
}
