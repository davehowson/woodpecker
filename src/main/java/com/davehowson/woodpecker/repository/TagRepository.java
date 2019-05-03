package com.davehowson.woodpecker.repository;

import com.davehowson.woodpecker.model.Tag;
import com.davehowson.woodpecker.model.TagName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(TagName tagName);
}
