package com.davehowson.woodpecker.controller;

import com.davehowson.woodpecker.model.Bookmark;
import com.davehowson.woodpecker.model.Category;
import com.davehowson.woodpecker.payload.ApiResponse;
import com.davehowson.woodpecker.payload.PagedResponse;
import com.davehowson.woodpecker.payload.bookmark.*;
import com.davehowson.woodpecker.security.CurrentUser;
import com.davehowson.woodpecker.security.UserPrincipal;
import com.davehowson.woodpecker.service.BookmarkService;
import com.davehowson.woodpecker.service.CategoryService;
import com.davehowson.woodpecker.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private BookmarkService bookmarkService;
    private CategoryService categoryService;

    @Autowired
    public BookmarkController(BookmarkService bookmarkService, CategoryService categoryService) {
        this.bookmarkService = bookmarkService;
        this.categoryService = categoryService;
    }

    @GetMapping("/category")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<CategoryResponse> getCategories(@CurrentUser UserPrincipal currentUser,
                                                    @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                    @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return categoryService.getCategoriesCreatedBy(currentUser, page, size);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<BookmarkResponse> getBookmarks(@CurrentUser UserPrincipal currentUser,
                                                        @RequestParam(value = "id") Long id,
                                                        @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return bookmarkService.getBookmarksCreateByCategory(id, currentUser, page, size);
    }

    @PostMapping("/category")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryRequest categoryRequest,
                                            @CurrentUser UserPrincipal currentUser) {
        Category category = categoryService.createCategory(categoryRequest, currentUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{noteId}")
                .buildAndExpand(category.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Category Created Successfully"));
    }



    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createBookmark(@Valid @RequestBody BookmarkRequest bookmarkRequest,
                                            @CurrentUser UserPrincipal currentUser) {
        Bookmark bookmark = bookmarkService.createBookmark(bookmarkRequest, currentUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{noteId}")
                .buildAndExpand(bookmark.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Bookmark Created Successfully"));
    }

    @PatchMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateNote(@Valid @RequestBody BookmarkUpdateRequest bookmarkUpdateRequest,
                                        @CurrentUser UserPrincipal currentUser) {
        Bookmark bookmark = bookmarkService.updateBookmark(bookmarkUpdateRequest, currentUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{noteId}")
                .buildAndExpand(bookmark.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Bookmark Updated Successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse deleteNote(@PathVariable("id") Long id) {
        return bookmarkService.deleteBookmark(id);
    }
}
