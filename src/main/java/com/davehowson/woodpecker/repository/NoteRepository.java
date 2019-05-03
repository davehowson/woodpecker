package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    Page<Note> findByCreatedByOrderByCreatedAtAsc(Long userId, Pageable pageable);

}