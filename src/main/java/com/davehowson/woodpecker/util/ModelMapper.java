package com.davehowson.woodpecker.util;

import com.davehowson.woodpecker.exception.AppException;
import com.davehowson.woodpecker.model.*;
import com.davehowson.woodpecker.payload.ApiRequest;
import com.davehowson.woodpecker.payload.NoteResponse;
import com.davehowson.woodpecker.payload.TaskResponse;
import com.davehowson.woodpecker.payload.UserSummary;
import com.davehowson.woodpecker.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;


public class ModelMapper {
    public static TaskResponse mapTasktoTaskResponse(Task task) {
        TaskResponse taskResponse = new TaskResponse();

        taskResponse.setId(task.getId());
        taskResponse.setDescription(task.getDescription());
        taskResponse.setDate(task.getDate());
        taskResponse.setIsComplete(task.isComplete());
        taskResponse.setTags(task.getTags());
        taskResponse.setCreationDateTime(task.getCreatedAt());

        User user = task.getUser();
        UserSummary summary = new UserSummary(user.getId(), user.getEmail());
        taskResponse.setCreatedBy(summary);

        return taskResponse;
    }

    public static NoteResponse mapNotetoNoteResponse(Note note) {
        NoteResponse noteResponse = new NoteResponse();

        noteResponse.setId(note.getId());
        noteResponse.setTitle(note.getTitle());
        noteResponse.setDescription(note.getDescription());
        noteResponse.setTags(note.getTags());
        noteResponse.setCreationDateTime(note.getCreatedAt());

        User user = note.getUser();
        UserSummary summary = new UserSummary(user.getId(), user.getEmail());
        noteResponse.setCreatedBy(summary);

        return noteResponse;
    }

}
