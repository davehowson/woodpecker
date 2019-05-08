package com.davehowson.woodpecker.payload.authentication;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class SignUpRequest extends AuthRequest {

    @NotBlank
    @Size(min = 4, max = 40)
    private String name;

}
