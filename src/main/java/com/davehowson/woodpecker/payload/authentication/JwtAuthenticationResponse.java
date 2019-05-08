package com.davehowson.woodpecker.payload.authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtAuthenticationResponse {

    private Long id;
    private String email;
    private String name;
    private String token;
}
