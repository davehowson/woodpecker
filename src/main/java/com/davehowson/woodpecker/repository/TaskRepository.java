package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Optional<Task> findById(Long taskId);
    Page<Task> findByCreatedByAndDateIs(Long userId, LocalDate data, Pageable pageable);
    void deleteById(Long taskId);

}
