package com.myle.example04.mapper;

import com.myle.example04.dto.UserDTO;
import com.myle.example04.dto.PostDTO;
import com.myle.example04.entity.User;
import com.myle.example04.entity.Post;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {
    public static UserDTO toDTO(User user) {
        List<PostDTO> postDTOs = user.getPosts().stream()
                                     .map(UserMapper::toPostDTO)
                                     .collect(Collectors.toList());

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPosts(postDTOs);
        return userDTO;
    }

    public static PostDTO toPostDTO(Post post) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setUserId(post.getUser() != null ? post.getUser().getId() : null);
        return postDTO;
    }

    public static User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPosts(userDTO.getPosts().stream().map(UserMapper::toPostEntity).collect(Collectors.toList()));
        return user;
    }

    public static Post toPostEntity(PostDTO postDTO) {
        Post post = new Post();
        post.setId(postDTO.getId());
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        if (postDTO.getUserId() != null) {
            User user = new User();
            user.setId(postDTO.getUserId());
            post.setUser(user);
        }
        return post;
    }
}
