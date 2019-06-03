package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Note;
import com.davehowson.woodpecker.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findByIdAndUser(Long noteId, User user);
    Page<Note> findByUserOrderByImportantDesc(User user, Pageable pageable);
    Page<Note> findByUserAndTagOrderByImportantDesc(User user, String tag, Pageable pageable);
    void deleteById(Long id);
}