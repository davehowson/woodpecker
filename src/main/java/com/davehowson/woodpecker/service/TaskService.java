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

    private List<TaskResponse> getTaskListOnDate(UserPrincipal currentUser, LocalDate date, String tag) {
        User user = getUser(currentUser);
        Set<Task> tasks = taskRepository.findByUserAndDateIsOrderByCompleteAsc(user, date);

        if (tag != null && !tag.equalsIgnoreCase("all")) {
            return tasks.stream()
                    .filter(task -> Objects.nonNull(task.getTag()))
                    .filter(task -> task.getTag().equalsIgnoreCase(tag))
                    .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
        }

        return tasks.stream()
                .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
    }

    private List<TaskResponse> getTaskListOverdue(UserPrincipal currentUser, LocalDate date, String tag) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByUserAndDateBeforeOrDateIsNullOrderByDateDescTimeAsc(user, date);

        return filterCompletedTasks(tasks, tag);
    }

    private List<TaskResponse> getTaskListUpcoming(UserPrincipal currentUser, LocalDate start, LocalDate end, String tag) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByUserAndDateBetweenOrderByDateAscTimeAsc(user, start, end);

        return filterCompletedTasks(tasks, tag);
    }

    private List<TaskResponse> filterCompletedTasks(List<Task> tasks, String tag) {
        if (tag != null && !tag.equalsIgnoreCase("all")) {
            return tasks.stream()
                    .filter(task -> Objects.nonNull(task.getTag()))
                    .filter(task -> task.getTag().equalsIgnoreCase(tag))
                    .filter(task -> !task.isComplete())
                    .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
        }

        return tasks.stream()
                .filter(task -> !task.isComplete())
                .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
    }


    private List<TaskResponse> getTaskListCompleted(UserPrincipal currentUser, LocalDate start, LocalDate end, String tag) {
        User user = getUser(currentUser);
        List<Task> tasks = taskRepository.findByUserAndDateBetweenOrderByDateAscTimeAsc(user, start, end);
        if (tag != null && !tag.equalsIgnoreCase("all")) {
            return tasks.stream()
                    .filter(task -> Objects.nonNull(task.getTag()))
                    .filter(task -> task.getTag().equalsIgnoreCase(tag))
                    .filter(Task::isComplete)
                    .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
        }
        return tasks.stream()
                .filter(Task::isComplete)
                .map(ModelMapper::mapTaskToTaskResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getTasks(UserPrincipal currentUser, String category, String scope) {
        LocalDate date = LocalDate.now();
        List<TaskResponse> resp = null;

        switch (scope) {
            case "today":
                resp = getTaskListOnDate(currentUser, date, category);
                break;
            case "upcoming":
                LocalDate start = LocalDate.now().plusDays(1);
                LocalDate end = LocalDate.now().plusDays(15);
                resp = getTaskListUpcoming(currentUser, start, end, category);
                break;
            case "overdue":
                resp = getTaskListOverdue(currentUser, date, category);
                break;
            case "completed":
                LocalDate startComp = LocalDate.now().minusDays(7);
                LocalDate endComp = LocalDate.now().plusDays(7);
                resp = getTaskListCompleted(currentUser, startComp, endComp, category);
                break;
            default:
                return null;
        }

        return resp;

    }

    public Task createTask(TaskRequest taskRequest, String email) {
        Task task = new Task();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        task.setDescription(taskRequest.getDescription());
        task.setDate(taskRequest.getDate());
        task.setTime(taskRequest.getTime());

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
