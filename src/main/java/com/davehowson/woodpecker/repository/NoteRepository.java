package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Note;
import com.davehowson.woodpecker.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findByIdAndCreatedBy(Long noteId, Long userId);
    Page<Note> findByCreatedByOrderByCreatedAtDesc(Long userId, Pageable pageable);
    Page<Note> findByCreatedByAndTagsContainingOrderByCreatedAtDesc(Long userId, Tag tag, Pageable pageable);
    void deleteById(Long id);
}