package com.davehowson.woodpecker.payload.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class UserSummary {
    private Long id;
    private String email;
}
