package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.AppException;
import com.davehowson.woodpecker.exception.BadRequestException;
import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.*;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.repository.NoteRepository;
import com.davehowson.woodpecker.repository.TagRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.util.AppConstants;
import com.davehowson.woodpecker.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository, UserRepository userRepository, TagRepository tagRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    public PagedResponse<NoteResponse> getNotesCreatedBy(UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);
        String email = currentUser.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Note> notes = noteRepository.findByCreatedByOrderByCreatedAtAsc(user.getId(), pageable);

        if (notes.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), notes.getNumber(),
                    notes.getSize(), notes.getTotalElements(), notes.getTotalPages(), notes.isLast());
        }

        List<NoteResponse> taskResponses = notes.map(ModelMapper::mapNotetoNoteResponse).getContent();

        return new PagedResponse<>(taskResponses, notes.getNumber(),
                notes.getSize(), notes.getTotalElements(), notes.getTotalPages(), notes.isLast());
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public Note createNote(NoteRequest noteRequest, String email) {
        Note note = new Note();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        note.setTitle(noteRequest.getTitle());
        note.setDescription(noteRequest.getDescription());

        Set<Tag> tags = new HashSet<>();
        noteRequest.getTagNames().forEach((v) -> {
            try {
                Tag tag  = tagRepository.findByName(TagName.valueOf(v)).orElseThrow(() -> new AppException("Tag not found"));
                tags.add(tag);
            } catch (IllegalArgumentException ex) {
                throw new AppException("Tag not found");
            }
        });

        note.setTags(tags);
        note.setUser(user);

        return noteRepository.save(note);
    }
}
