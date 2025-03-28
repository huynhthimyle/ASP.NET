package com.myle.example04.repository;

import com.myle.example04.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Lấy danh sách bài viết theo user_id
    List<Post> findByUserId(Long userId);
    List<Post> findByTitleContainingIgnoreCase(String keyword);
}
