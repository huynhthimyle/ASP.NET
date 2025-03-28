package com.myle.example04.dto;

public class AddressDTO {
    private Long id;
    private String street;
    private String city;

    // Constructor
    public AddressDTO(Long id, String street, String city) {
        this.id = id;
        this.street = street;
        this.city = city;
    }

    // Getters and Setters
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
}