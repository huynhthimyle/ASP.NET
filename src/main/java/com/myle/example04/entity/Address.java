package com.myle.example04.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "addresses") // Sửa lỗi cú pháp
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Sửa lỗi thiếu dấu '='
    private Long id;
    
    private String street;
    private String city;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Constructor mặc định
    public Address() {}

    // Constructor đầy đủ
    public Address(String street, String city, User user) {
        this.street = street;
        this.city = city;
        this.user = user;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
