package com.myle.example04.service;

import com.myle.example04.dto.UserDTO;
import com.myle.example04.entity.User;
import com.myle.example04.mapper.UserMapper;
import com.myle.example04.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Lấy tất cả người dùng
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }

    // Lấy người dùng theo ID
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(UserMapper::toDTO);
    }

    // Tìm người dùng theo email
    public Optional<UserDTO> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(UserMapper::toDTO);
    }

    // Thêm hoặc cập nhật người dùng (có kiểm tra trùng email)
    public UserDTO saveUser(UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email đã tồn tại!");
        }
        User user = UserMapper.toEntity(userDTO);
        return UserMapper.toDTO(userRepository.save(user));
    }

    // Cập nhật thông tin người dùng theo ID
    public UserDTO updateUser(Long id, UserDTO newUserDTO) {
        return userRepository.findById(id).map(user -> {
            user.setName(newUserDTO.getName());
            user.setEmail(newUserDTO.getEmail());
            return UserMapper.toDTO(userRepository.save(user));
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy User với ID: " + id));
    }

    // Xóa người dùng theo ID
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
