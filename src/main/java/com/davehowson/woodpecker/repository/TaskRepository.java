package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Optional<Task> findById(Long userId);

    Page<Task> findByCreatedByOrderByDateDesc(Long userId, Pageable pageable);

    Page<Task> findByCreatedByAndDateIs(Long userId, LocalDate data, Pageable pageable);

    List<Task> findByCreatedBy(Long userId);

    long countByCreatedBy(Long userId);

    List<Task> findByIdIn(List<Long> taskIds);

    List<Task> findByIdIn(List<Long> pollIds, Sort sort);
}
