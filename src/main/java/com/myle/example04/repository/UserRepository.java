package com.myle.example04.repository;

import com.myle.example04.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    // Thêm các phương thức tùy chỉnh nếu cần
}
