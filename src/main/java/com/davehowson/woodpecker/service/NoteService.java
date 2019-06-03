package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.AppException;
import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.*;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.payload.note.NoteRequest;
import com.davehowson.woodpecker.payload.note.NoteResponse;
import com.davehowson.woodpecker.payload.note.NoteUpdateRequest;
import com.davehowson.woodpecker.repository.NoteRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.util.ModelMapper;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class NoteService extends ServiceInterface {

    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(UserRepository userRepository, NoteRepository noteRepository) {
        super(userRepository);
        this.noteRepository = noteRepository;
    }

    public PagedResponse<NoteResponse> getNotesCreatedBy(UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);
        String email = currentUser.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.ASC, "createdAt");
        Page<Note> notes = noteRepository.findByUserOrderByImportantDesc(user, pageable);

        return returnPagedResponse(notes);
    }

    public PagedResponse<NoteResponse> getNotesCreatedByAndTagged(UserPrincipal currentUser, String tag, int page, int size) {
        validatePageNumberAndSize(page, size);
        String email = currentUser.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Note> notes = noteRepository.findByUserAndTagOrderByImportantDesc(user, tag, pageable);

        return returnPagedResponse(notes);
    }

    private PagedResponse<NoteResponse> returnPagedResponse(Page<Note> notes) {
        if (notes.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), notes.getNumber(),
                    notes.getSize(), notes.getTotalElements(), notes.getTotalPages(), notes.isLast());
        }

        List<NoteResponse> taskResponses = notes.map(ModelMapper::mapNoteToNoteResponseAbbr).getContent();

        return new PagedResponse<>(taskResponses, notes.getNumber(),
                notes.getSize(), notes.getTotalElements(), notes.getTotalPages(), notes.isLast());
    }

    public NoteResponse getNote(UserPrincipal currentUser, Long noteId) {
        String email = currentUser.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Note note = noteRepository.findByIdAndUser(noteId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "note id", noteId));
        return ModelMapper.mapNoteToNoteResponse(note);
    }


    public Note createNote(NoteRequest noteRequest, String email) {
        Note note = new Note();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        note.setUser(user);

        return noteRepository.save(persistNote(noteRequest, note));
    }

    public Note updateNote(NoteUpdateRequest noteUpdateRequest) {
        Note note = noteRepository.findById(noteUpdateRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteUpdateRequest.getId()));

        noteRepository.save(persistNote(noteUpdateRequest, note));
        return note;
    }

    private Note persistNote(NoteRequest noteRequest, Note note) {
        note.setTitle(noteRequest.getTitle());
        note.setDescription(noteRequest.getDescription());
        note.setImportant(noteRequest.getImportant());

        if (noteRequest.getTag() == null || noteRequest.getTag().isEmpty()) {
            note.setTag(null);
        } else if (!(EnumUtils.isValidEnum(TagName.class, noteRequest.getTag()))) {
            throw new AppException("Invalid Tag");
        } else {
            note.setTag(noteRequest.getTag());
        }

        return note;
    }

    public ApiResponse deleteNote(Long noteId) {
        noteRepository.deleteById(noteId);
        return new ApiResponse(true, "Note Successfully Deleted");
    }
}
