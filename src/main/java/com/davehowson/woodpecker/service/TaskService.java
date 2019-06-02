package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.AppException;
import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.TagName;
import com.davehowson.woodpecker.model.Task;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.payload.task.*;
import com.davehowson.woodpecker.repository.TaskRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.util.ModelMapper;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskService extends ServiceInterface {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(UserRepository userRepository, TaskRepository taskRepository) {
        super(userRepository);
        this.taskRepository = taskRepository;
    }

    public List<TaskResponse> getTaskListOnDate(UserPrincipal currentUser, LocalDate date) {
        User user = getUser(currentUser);
        Set<Task> tasks = taskRepository.findByCreatedByAndDateIsOrderByImportantDescCompleteAsc(user.getId(), date);
        return tasks.stream()
                .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTaskListOverdue(UserPrincipal currentUser, LocalDate date) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByCreatedByAndDateBeforeOrDateIsNullOrderByImportantDescDateDesc(user.getId(), date);
        return tasks.stream()
                .filter(task -> !task.isComplete())
                .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTaskListUpcoming(UserPrincipal currentUser, LocalDate start, LocalDate end) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByCreatedByAndDateBetweenOrderByImportantDescDateAsc(user.getId(), start, end);
        return tasks.stream()
                .filter(task -> !task.isComplete())
                .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTaskListUpcomingDashboard(UserPrincipal currentUser, LocalDate start, LocalDate end) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findTop6ByCreatedByAndDateBetweenOrderByImportantDescDateAsc(user.getId(), start, end);
        return tasks.stream()
                .filter(task -> !task.isComplete())
                .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTaskListCompleted(UserPrincipal currentUser, LocalDate start, LocalDate end) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByCreatedByAndDateBetweenOrderByImportantDescDateAsc(user.getId(), start, end);
        return tasks.stream()
                .filter(Task::isComplete)
                .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
    }

    public Task createTask(TaskRequest taskRequest, String email) {
        Task task = new Task();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        task.setDescription(taskRequest.getDescription());
        task.setDate(taskRequest.getDate());
        task.setTime(taskRequest.getTime());
        task.setImportant(taskRequest.getImportant());

        if (taskRequest.getTag() == null || taskRequest.getTag().isEmpty()) {
            task.setTag(null);
        } else if (!(EnumUtils.isValidEnum(TagName.class, taskRequest.getTag()))) {
            throw new AppException("Invalid Tag");
        } else {
            task.setTag(taskRequest.getTag());
        }

        task.setUser(user);

        return taskRepository.save(task);
    }

    public TaskCompleteResponse completeTask(TaskCompleteRequest taskCompleteRequest) {
        Task task = taskRepository.findById(taskCompleteRequest.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskCompleteRequest.getTaskId()));

        task.setComplete(taskCompleteRequest.isStatus());
        taskRepository.save(task);

        TaskCompleteResponse taskCompleteResponse = new TaskCompleteResponse();
        taskCompleteResponse.setTaskId(taskCompleteRequest.getTaskId());
        taskCompleteResponse.setStatus(taskCompleteRequest.isStatus());
        taskCompleteResponse.setMessage("Successfully Completed Task");

        return taskCompleteResponse;
    }

    public Task updateTask(TaskUpdateRequest taskUpdateRequest, String email) {
        Task task = taskRepository.findById(taskUpdateRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", taskUpdateRequest.getId()));
        task.setDescription(taskUpdateRequest.getDescription());
        task.setDate(taskUpdateRequest.getDate());
        task.setComplete(taskUpdateRequest.getComplete());
        task.setTag(taskUpdateRequest.getTag());
        task.setImportant(taskUpdateRequest.getImportant());
        taskRepository.save(task);
        return task;
    }

    public ApiResponse deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
        return new ApiResponse(true, "Task Successfully Deleted");
    }

    private User getUser(UserPrincipal currentUser) {
        String email = currentUser.getEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }
}
