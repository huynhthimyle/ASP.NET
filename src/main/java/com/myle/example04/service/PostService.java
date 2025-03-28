package com.myle.example04.service;

import com.myle.example04.dto.PostDTO;
import com.myle.example04.entity.Post;
import com.myle.example04.mapper.UserMapper;
import com.myle.example04.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream().map(UserMapper::toPostDTO).collect(Collectors.toList());
    }

    public List<PostDTO> getPostsByTitleKeyword(String keyword) {
        return postRepository.findByTitleContainingIgnoreCase(keyword).stream().map(UserMapper::toPostDTO).collect(Collectors.toList());
    }

    public Optional<PostDTO> getPostById(Long id) {
        return postRepository.findById(id).map(this::convertToDTO);
    }

    public PostDTO savePost(PostDTO postDTO) {
        Post post = convertToEntity(postDTO);
        return convertToDTO(postRepository.save(post));
    }

    public PostDTO updatePost(Long id, PostDTO newPostDTO) {
        return postRepository.findById(id).map(post -> {
            post.setTitle(newPostDTO.getTitle());
            return convertToDTO(postRepository.save(post));
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy Post với ID: " + id));
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    private PostDTO convertToDTO(Post post) {
        return new PostDTO();
    }

    private Post convertToEntity(PostDTO postDTO) {
        Post post = new Post();
        post.setId(postDTO.getId());
        post.setTitle(postDTO.getTitle());
        return post;
    }
}
