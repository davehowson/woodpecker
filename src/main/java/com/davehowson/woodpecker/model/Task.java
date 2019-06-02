package com.davehowson.woodpecker.model;

import com.davehowson.woodpecker.model.audit.UserDateAudit;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "tasks")
public class Task extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate date;

    @Column
    private LocalTime time;

    @NotBlank
    @Size(max = 200)
    private String description;

    @Column
    private boolean complete = false;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column
    private String tag;

}
