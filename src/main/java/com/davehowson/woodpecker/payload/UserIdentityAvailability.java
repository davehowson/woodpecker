package com.davehowson.woodpecker.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserIdentityAvailability {
    private Boolean available;
}
