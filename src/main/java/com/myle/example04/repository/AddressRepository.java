package com.myle.example04.repository;

import com.myle.example04.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    // Tìm địa chỉ theo user_id
    Address findByUserId(Long userId);
}
