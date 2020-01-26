package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.Address;
import com.TicketTime.TicketTime.repository.AddressRepository;
import com.TicketTime.TicketTime.exception.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://ticketclock.com")
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
    public Address insert(@RequestBody Address address) {
        Address newAddress = this.addressRepository.insert(address);
        return newAddress;
    }

    @PostMapping
    public Address update(@RequestBody Address address) {
        Address newAddress = this.addressRepository.save(address);
        return newAddress;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.addressRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Address> getById(@PathVariable("id") String id) {
        Optional<Address> ticket = this.addressRepository.findById(id);
        if (ticket.equals(null)) {
            throw new NotFoundException("Address Not Found");
        }
        return ticket;
    }
}

