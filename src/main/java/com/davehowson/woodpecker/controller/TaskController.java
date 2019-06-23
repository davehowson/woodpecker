package com.davehowson.woodpecker.controller;

import com.davehowson.woodpecker.model.Task;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.payload.task.*;
import com.davehowson.woodpecker.security.CurrentUser;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;
    private Logger logger = LoggerFactory.getLogger(TaskController.class);

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }


    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<TaskResponse> getTasks(@CurrentUser UserPrincipal currentUser,
                                                    @RequestParam String category,
                                                    @RequestParam String scope) {
        return taskService.getTasks(currentUser, category, scope);
    }


    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskRequest taskRequest,
                                        @CurrentUser UserPrincipal currentUser ) {
        Task task = taskService.createTask(taskRequest, currentUser.getEmail());

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{taskId}")
                .buildAndExpand(task.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Task Created Successfully"));
    }

    @PostMapping("/task/complete")
    @PreAuthorize("hasRole('USER')")
    public TaskCompleteResponse completeTask(@RequestBody TaskCompleteRequest taskCompleteRequest){
        return taskService.completeTask(taskCompleteRequest);
    }

    @PatchMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateNote(@Valid @RequestBody TaskUpdateRequest taskUpdateRequest,
                                        @CurrentUser UserPrincipal currentUser) {
        Task note = taskService.updateTask(taskUpdateRequest, currentUser.getEmail());

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{taskId}")
                .buildAndExpand(note.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Task Updated Successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse deleteNote(@PathVariable("id") Long id){
        return taskService.deleteTask(id);
    }

}
