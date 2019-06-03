package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Task;
import com.davehowson.woodpecker.model.User;
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
    Set<Task> findByUserAndDateIsOrderByCompleteAsc(User user, LocalDate date);
    List<Task> findByUserAndDateBeforeOrDateIsNullOrderByDateDesc(User user, LocalDate date);
    List<Task> findByUserAndDateBetweenOrderByDateAsc(User user, LocalDate start, LocalDate end);
    List<Task> findTop6ByUserAndDateBetweenOrderByDateAsc(User user, LocalDate start, LocalDate end);
}
