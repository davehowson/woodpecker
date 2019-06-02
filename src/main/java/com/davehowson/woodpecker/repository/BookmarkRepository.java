package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Bookmark;
import com.davehowson.woodpecker.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Page<Bookmark> findByCreatedByAndCategory(Long userId, Category category, Pageable pageable);
}
