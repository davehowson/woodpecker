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

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;
    private Logger logger = LoggerFactory.getLogger(TaskController.class);

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping("/today")
    @PreAuthorize("hasRole('USER')")
    public List<TaskResponse> getTasksOnDate(@CurrentUser UserPrincipal currentUser,
                                       @RequestParam String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return taskService.getTaskListOnDate(currentUser, localDate);
    }

    @GetMapping("/inbox")
    @PreAuthorize("hasRole('USER')")
    public List<TaskResponse> getTasksInbox(@CurrentUser UserPrincipal currentUser) {
        LocalDate date = LocalDate.now();
        return taskService.getTaskListInbox(currentUser, date);
    }

    @GetMapping("/upcoming")
    @PreAuthorize("hasRole('USER')")
    public List<TaskResponse> getTasksUpcoming(@CurrentUser UserPrincipal currentUser) {
        LocalDate start = LocalDate.now();
        LocalDate end = LocalDate.now().plusDays(14);
        return taskService.getTaskListUpcoming(currentUser, start, end);
    }

    @GetMapping("/completed")
    @PreAuthorize("hasRole('USER')")
    public List<TaskResponse> getTasksCompleted(@CurrentUser UserPrincipal currentUser) {
        LocalDate start = LocalDate.now().minusDays(7);
        LocalDate end = LocalDate.now().plusDays(7);
        return taskService.getTaskListCompleted(currentUser, start, end);
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('USER')")
    public List<TaskResponse> getTasksDashboard(@CurrentUser UserPrincipal currentUser) {
        LocalDate start = LocalDate.now();
        LocalDate end = LocalDate.now().plusDays(14);
        return taskService.getTaskListUpcomingDashboard(currentUser, start, end);
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
