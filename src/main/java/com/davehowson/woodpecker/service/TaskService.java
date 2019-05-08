package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.Tag;
import com.davehowson.woodpecker.model.Task;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.payload.task.*;
import com.davehowson.woodpecker.repository.TagRepository;
import com.davehowson.woodpecker.repository.TaskRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskService extends TaggedService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TagRepository tagRepository, UserRepository userRepository, TaskRepository taskRepository) {
        super(tagRepository, userRepository);
        this.taskRepository = taskRepository;
    }

    public List<TaskResponse> getTaskListOnDate(UserPrincipal currentUser, LocalDate date) {
        User user = getUser(currentUser);
        Set<Task> tasks = taskRepository.findByCreatedByAndDateIsOrderByCompleteAsc(user.getId(), date);
        return tasks.stream()
                .map(ModelMapper::mapTasktoTaskResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTaskListInbox(UserPrincipal currentUser, LocalDate date) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByCreatedByAndCompleteIsFalseAndDateBefore(user.getId(), date);
        return tasks.stream()
                .map(ModelMapper::mapTasktoTaskResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTaskListUpcoming(UserPrincipal currentUser, LocalDate start, LocalDate end) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByCreatedByAndDateBetweenOrderByDateAsc(user.getId(), start, end);
        return tasks.stream()
                .filter(task -> !task.isComplete())
                .map(ModelMapper::mapTasktoTaskResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTaskListCompleted(UserPrincipal currentUser, LocalDate start, LocalDate end) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByCreatedByAndDateBetweenOrderByDateAsc(user.getId(), start, end);
        return tasks.stream()
                .filter(Task::isComplete)
                .map(ModelMapper::mapTasktoTaskResponse).collect(Collectors.toList());
    }

    public Task createTask(TaskRequest taskRequest, String email) {
        Task task = new Task();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        task.setDescription(taskRequest.getDescription());
        task.setDate(taskRequest.getDate());
        task.setTime(taskRequest.getTime());
        Set<Tag> tags = mapTags(taskRequest);

        task.setTags(tags);
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
        Set<Tag> tags = mapTags(taskUpdateRequest);
        task.setTags(tags);
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
