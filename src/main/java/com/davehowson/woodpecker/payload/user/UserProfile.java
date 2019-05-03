package com.davehowson.woodpecker.payload.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class UserProfile {
    private Long id;
    private String email;
    private String name;
    private Instant joinedAt;
}
