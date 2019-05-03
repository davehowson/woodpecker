package com.davehowson.woodpecker.controller;


import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.payload.UserIdentityAvailability;
import com.davehowson.woodpecker.payload.UserProfile;
import com.davehowson.woodpecker.payload.UserSummary;
import com.davehowson.woodpecker.repository.TaskRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.security.CurrentUser;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getName());
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/profile")
    public UserProfile getUserProfile(@CurrentUser UserPrincipal currentUser) {
        String email = currentUser.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        return new UserProfile(user.getId(), user.getEmail(), user.getName(), user.getCreatedAt());
    }

}
