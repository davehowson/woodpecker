package com.davehowson.woodpecker.controller;


import com.davehowson.woodpecker.exception.AppException;
import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.payload.ApiResponse;
import com.davehowson.woodpecker.payload.user.UserIdentityAvailability;
import com.davehowson.woodpecker.payload.user.UserProfile;
import com.davehowson.woodpecker.payload.user.UserSummary;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.security.CurrentUser;
import com.davehowson.woodpecker.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getName());
    }

    @GetMapping("/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/profile")
    public UserProfile getUserProfile(@CurrentUser UserPrincipal currentUser) {
        String email = currentUser.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        return new UserProfile(user.getId(), user.getEmail(), user.getName(), user.getCreatedAt());
    }

    @PatchMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody UserProfile userProfile,
                                         @CurrentUser UserPrincipal currentUser) {
        if (userProfile.getId().equals(currentUser.getId())) {
            User user = userRepository.findById(currentUser.getId())
                    .orElseThrow(() -> new AppException("Unable to find user"));
            user.setEmail(userProfile.getEmail());
            user.setName(userProfile.getName());

            User result = userRepository.save(user);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentContextPath().path("/api/users/{id}")
                    .buildAndExpand(result.getId()).toUri();

            return ResponseEntity.created(location).body(new ApiResponse(true, "User details updated successfully"));
        } else {
            return new ResponseEntity<>(new ApiResponse(false, "User ID mismatch"),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse deleteUser(@PathVariable("id") Long id,
                                        @CurrentUser UserPrincipal currentUser) {
        if (currentUser.getId().equals(id)) {
            userRepository.deleteById(id);
            return new ApiResponse(true, "Deleted User");
        }
        return new ApiResponse(false, "User not found");

    }

}
