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
    Set<Task> findByCreatedByAndDateIsOrderByImportantDescCompleteAsc(Long userId, LocalDate date);
    List<Task> findByCreatedByAndDateBeforeOrDateIsNullOrderByImportantDescDateDesc(Long userId, LocalDate date);
    List<Task> findByCreatedByAndDateBetweenOrderByImportantDescDateAsc(Long id, LocalDate start, LocalDate end);
    List<Task> findTop6ByCreatedByAndDateBetweenOrderByImportantDescDateAsc(Long id, LocalDate start, LocalDate end);
}
