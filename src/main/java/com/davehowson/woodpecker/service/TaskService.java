package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.Tag;
import com.davehowson.woodpecker.model.Task;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.repository.TagRepository;
import com.davehowson.woodpecker.repository.TaskRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class TaskService extends TaggedService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TagRepository tagRepository, UserRepository userRepository, TaskRepository taskRepository) {
        super(tagRepository, userRepository);
        this.taskRepository = taskRepository;
    }

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);

    public PagedResponse<TaskResponse> getTasksCreatedBy(UserPrincipal currentUser, LocalDate date, int page, int size) {
        validatePageNumberAndSize(page, size);
        String email = currentUser.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Task> tasks = taskRepository.findByCreatedByAndDateIs(user.getId(), date, pageable);

        if (tasks.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), tasks.getNumber(),
                    tasks.getSize(), tasks.getTotalElements(), tasks.getTotalPages(), tasks.isLast());
        }

        List<TaskResponse> taskResponses = tasks.map(ModelMapper::mapTasktoTaskResponse).getContent();

        return new PagedResponse<>(taskResponses, tasks.getNumber(),
                tasks.getSize(), tasks.getTotalElements(), tasks.getTotalPages(), tasks.isLast());
    }


    public Task createTask(TaskRequest taskRequest, String email) {
        Task task = new Task();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        task.setDescription(taskRequest.getDescription());
        task.setDate(taskRequest.getDate());
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

}
