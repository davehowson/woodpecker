package com.davehowson.woodpecker.payload.authentication;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class PasswordRequest {
    @NotNull
    private String oldPassword;

    @NotNull
    private String newPassword;
}
