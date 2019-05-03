package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.*;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.payload.note.NoteRequest;
import com.davehowson.woodpecker.payload.note.NoteResponse;
import com.davehowson.woodpecker.payload.note.NoteUpdateRequest;
import com.davehowson.woodpecker.repository.NoteRepository;
import com.davehowson.woodpecker.repository.TagRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
public class NoteService extends TaggedService {

    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(TagRepository tagRepository, UserRepository userRepository, NoteRepository noteRepository) {
        super(tagRepository, userRepository);
        this.noteRepository = noteRepository;
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


    public Note createNote(NoteRequest noteRequest, String email) {
        Note note = new Note();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        note.setTitle(noteRequest.getTitle());
        note.setDescription(noteRequest.getDescription());

        Set<Tag> tags = mapTags(noteRequest);

        note.setTags(tags);
        note.setUser(user);

        return noteRepository.save(note);
    }

    public Note updateNote(NoteUpdateRequest noteUpdateRequest, String email) {
        Note note = noteRepository.findById(noteUpdateRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteUpdateRequest.getId()));
        note.setTitle(noteUpdateRequest.getTitle());
        note.setDescription(noteUpdateRequest.getDescription());
        Set<Tag> tags = mapTags(noteUpdateRequest);
        note.setTags(tags);
        noteRepository.save(note);
        return note;
    }

    public ApiResponse deleteNote(Long noteId) {
        noteRepository.deleteById(noteId);
        return new ApiResponse(true, "Note Successfully Deleted");
    }
}
