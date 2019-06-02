package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.AppException;
import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.Bookmark;
import com.davehowson.woodpecker.model.Category;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.payload.ApiResponse;
import com.davehowson.woodpecker.payload.PagedResponse;
import com.davehowson.woodpecker.payload.bookmark.BookmarkRequest;
import com.davehowson.woodpecker.payload.bookmark.BookmarkResponse;
import com.davehowson.woodpecker.payload.bookmark.BookmarkUpdateRequest;
import com.davehowson.woodpecker.payload.bookmark.CategoryResponse;
import com.davehowson.woodpecker.repository.BookmarkRepository;
import com.davehowson.woodpecker.repository.CategoryRepository;
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


@Service
public class BookmarkService extends  ServiceInterface {

    private final CategoryRepository categoryRepository;
    private final BookmarkRepository bookmarkRepository;

    @Autowired
    public BookmarkService(UserRepository userRepository, CategoryRepository categoryRepository,
                           BookmarkRepository bookmarkRepository) {
        super(userRepository);
        this.categoryRepository = categoryRepository;
        this.bookmarkRepository = bookmarkRepository;
    }

    public PagedResponse<BookmarkResponse> getBookmarksCreateByCategory(Long id, UserPrincipal currentUser, int page, int size){
        validatePageNumberAndSize(page, size);
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUser.getEmail()));

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "category", id));

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.ASC, "createdAt");
        Page<Bookmark> bookmarks = bookmarkRepository.findByCreatedByAndCategory(user.getId(), category, pageable);

        return returnPagedResponse(bookmarks);
    }

    private PagedResponse<BookmarkResponse> returnPagedResponse(Page<Bookmark> pages) {
        if (pages.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), pages.getNumber(),
                    pages.getSize(), pages.getTotalElements(), pages.getTotalPages(), pages.isLast());
        }

        List<BookmarkResponse> bookmarkResponses = pages.map(ModelMapper::mapBookmarkToBookmarkResponse).getContent();

        return new PagedResponse<>(bookmarkResponses, pages.getNumber(),
                pages.getSize(), pages.getTotalElements(), pages.getTotalPages(), pages.isLast());
    }

    public Bookmark createBookmark(BookmarkRequest bookmarkRequest, UserPrincipal currentUser) {
        Bookmark bookmark = new Bookmark();
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUser.getEmail()));

        Category category = categoryRepository.findById(bookmarkRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "category", bookmarkRequest.getCategoryId()));

        bookmark.setCategory(category);
        bookmark.setName(bookmarkRequest.getName());
        bookmark.setUrl(bookmarkRequest.getUrl());
        bookmark.setUser(user);

        return bookmarkRepository.save(bookmark);
    }

    public Bookmark updateBookmark(BookmarkUpdateRequest bookmarkUpdateRequest, UserPrincipal currentUser) {
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUser.getEmail()));

        Bookmark bookmark = bookmarkRepository.findById(bookmarkUpdateRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Bookmark", "id", bookmarkUpdateRequest.getId()));

        if (user.getId().compareTo(bookmark.getUser().getId()) > 0) {
            throw new AppException("Incorrect User");
        }

        Category category = categoryRepository.findById(bookmarkUpdateRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "category", bookmarkUpdateRequest.getCategoryId()));

        bookmark.setName(bookmarkUpdateRequest.getName());
        bookmark.setCategory(category);
        bookmark.setUrl(bookmarkUpdateRequest.getUrl());

        return bookmarkRepository.save(bookmark);
    }


    public ApiResponse deleteBookmark(Long id) {

        bookmarkRepository.deleteById(id);
        return new ApiResponse(true, "Bookmark Successfully Deleted");
    }

}
