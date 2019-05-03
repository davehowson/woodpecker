package com.davehowson.woodpecker.util;

import com.davehowson.woodpecker.model.Task;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.payload.TaskResponse;
import com.davehowson.woodpecker.payload.UserSummary;

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
}
