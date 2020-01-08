package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.Address;
import com.TicketTime.TicketTime.repository.AddressRepository;
import com.TicketTime.TicketTime.exception.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/address")
public class AddressController {

    private AddressRepository addressRepository;

    public AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @GetMapping("/all")
    public List<Address> getAll() {
        return addressRepository.findAll();
    }

    @PutMapping
    public String insert(@RequestBody Address address) {
        Address newUser = this.addressRepository.insert(address);
        return newUser.getId();
    }

    @PostMapping
    public String update(@RequestBody Address address) {
        Address newUser = this.addressRepository.save(address);
        return newUser.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.addressRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Address> getById(@PathVariable("id") String id) {
        Optional<Address> ticket = this.addressRepository.findById(id);
        if (ticket.isEmpty()) {
            throw new NotFoundException("Address Not Found");
        }
        return ticket;
    }
}

