package com.davehowson.woodpecker.service;

import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.Bookmark;
import com.davehowson.woodpecker.model.Category;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.payload.PagedResponse;
import com.davehowson.woodpecker.payload.bookmark.CategoryRequest;
import com.davehowson.woodpecker.payload.bookmark.CategoryResponse;
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
public class CategoryService extends ServiceInterface{
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(UserRepository userRepository, CategoryRepository categoryRepository) {
        super(userRepository);
        this.categoryRepository = categoryRepository;
    }

    public PagedResponse<CategoryResponse> getCategoriesCreatedBy(UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUser.getEmail()));

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.ASC, "createdAt");
        Page<Category> categories = categoryRepository.findByCreatedBy(user.getId(), pageable);

        return returnPagedResponse(categories);
    }

    private PagedResponse<CategoryResponse> returnPagedResponse(Page<Category> pages) {
        if (pages.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), pages.getNumber(),
                    pages.getSize(), pages.getTotalElements(), pages.getTotalPages(), pages.isLast());
        }

        List<CategoryResponse> categoryResponses = pages.map(ModelMapper::mapCategoryToCategoryResponse).getContent();

        return new PagedResponse<>(categoryResponses, pages.getNumber(),
                pages.getSize(), pages.getTotalElements(), pages.getTotalPages(), pages.isLast());
    }

    public Category createCategory(CategoryRequest categoryRequest, UserPrincipal currentUser) {
        Category category = new Category();
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUser.getEmail()));

        category.setName(categoryRequest.getName());
        category.setUser(user);

        return categoryRepository.save(category);

    }

}
