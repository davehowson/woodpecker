package com.davehowson.woodpecker.controller;

import com.davehowson.woodpecker.model.Note;
import com.davehowson.woodpecker.payload.*;
import com.davehowson.woodpecker.security.CurrentUser;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.service.NoteService;
import com.davehowson.woodpecker.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public PagedResponse<NoteResponse> getNotes(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return noteService.getNotesCreatedBy(currentUser, page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createNote(@Valid @RequestBody NoteRequest noteRequest,
                                        @CurrentUser UserPrincipal currentUser ) {
        Note note = noteService.createNote(noteRequest, currentUser.getUsername());

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{noteId}")
                .buildAndExpand(note.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Note Created Successfully"));
    }

}
