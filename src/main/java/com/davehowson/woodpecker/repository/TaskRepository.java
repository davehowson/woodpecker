package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Optional<Task> findById(Long taskId);
    void deleteById(Long taskId);
    Set<Task> findByCreatedByAndDateIsOrderByCompleteAsc(Long userId, LocalDate date);
    List<Task> findByCreatedByAndCompleteIsFalseAndDateBeforeOrDateIsNullOrderByCreatedAt(Long userId, LocalDate date);
    List<Task> findByCreatedByAndDateBetweenOrderByDateAsc(Long id, LocalDate start, LocalDate end);
    List<Task> findTop6ByCreatedByAndDateBetweenOrderByDateAsc(Long id, LocalDate start, LocalDate end);
}
