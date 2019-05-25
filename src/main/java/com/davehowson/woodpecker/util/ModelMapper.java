package com.davehowson.woodpecker.util;

import com.davehowson.woodpecker.model.*;
import com.davehowson.woodpecker.payload.note.NoteResponse;
import com.davehowson.woodpecker.payload.task.TaskResponse;
import com.davehowson.woodpecker.payload.user.UserSummary;
import org.apache.commons.lang3.StringUtils;


public class ModelMapper {
    public static TaskResponse mapTaskToTaskResponse(Task task) {
        TaskResponse taskResponse = new TaskResponse();

        taskResponse.setId(task.getId());
        taskResponse.setDescription(task.getDescription());
        taskResponse.setDate(task.getDate());
        taskResponse.setTime(task.getTime());
        taskResponse.setComplete(task.isComplete());
        taskResponse.setTag(task.getTag());
        taskResponse.setCreationDateTime(task.getCreatedAt());
        taskResponse.setImportant(task.isImportant());

        User user = task.getUser();
        UserSummary summary = new UserSummary(user.getId(), user.getEmail());
        taskResponse.setCreatedBy(summary);

        return taskResponse;
    }

    public static NoteResponse mapNoteToNoteResponseAbbr(Note note) {

        NoteResponse noteResponse = mapNoteToNoteResponse(note);
        noteResponse.setDescription(StringUtils.abbreviate(note.getDescription(), 250));

        return noteResponse;
    }

    public static NoteResponse mapNoteToNoteResponse(Note note) {
        NoteResponse noteResponse = new NoteResponse();

        noteResponse.setId(note.getId());
        noteResponse.setTitle(note.getTitle());
        noteResponse.setDescription(note.getDescription());
        noteResponse.setTag(note.getTag());
        noteResponse.setImportant(note.getImportant());
        noteResponse.setCreationDateTime(note.getCreatedAt());

        User user = note.getUser();
        UserSummary summary = new UserSummary(user.getId(), user.getEmail());
        noteResponse.setCreatedBy(summary);

        return noteResponse;
    }

}
