package com.davehowson.woodpecker.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.stereotype.Service;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@Getter
@Service
@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdBy"},
        allowGetters = true
)
public abstract class UserDateAudit extends DateAudit {
    @CreatedBy
    @Column(updatable = false)
    private Long createdBy;
}
