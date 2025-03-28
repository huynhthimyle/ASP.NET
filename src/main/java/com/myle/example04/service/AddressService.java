package com.myle.example04.service;

import com.myle.example04.dto.AddressDTO;
import com.myle.example04.entity.Address;
import com.myle.example04.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public List<AddressDTO> getAllAddresses() {
        return addressRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<AddressDTO> getAddressById(Long id) {
        return addressRepository.findById(id).map(this::convertToDTO);
    }

    public AddressDTO saveAddress(AddressDTO addressDTO) {
        Address address = convertToEntity(addressDTO);
        return convertToDTO(addressRepository.save(address));
    }

    public AddressDTO updateAddress(Long id, AddressDTO newAddressDTO) {
        return addressRepository.findById(id).map(address -> {
            address.setStreet(newAddressDTO.getStreet());
            address.setCity(newAddressDTO.getCity());
            return convertToDTO(addressRepository.save(address));
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy Address với ID: " + id));
    }

    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }

    private AddressDTO convertToDTO(Address address) {
        return new AddressDTO(address.getId(), address.getStreet(), address.getCity());
    }

    private Address convertToEntity(AddressDTO addressDTO) {
        Address address = new Address();
        address.setId(addressDTO.getId());
        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        return address;
    }
}