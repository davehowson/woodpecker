package com.davehowson.woodpecker.controller;

import com.davehowson.woodpecker.model.Task;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.security.CurrentUser;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.util.AppConstants;
import com.davehowson.woodpecker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping
    public PagedResponse<TaskResponse> getTasks(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam String date,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return taskService.getTasksCreatedBy(currentUser, localDate, page, size);
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
