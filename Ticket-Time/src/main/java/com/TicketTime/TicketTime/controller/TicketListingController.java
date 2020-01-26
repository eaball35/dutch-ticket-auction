package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.exception.NotFoundException;
import com.TicketTime.TicketTime.model.TicketListing;
import com.TicketTime.TicketTime.repository.TicketListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://ticketclock.com")
@RestController
@RequestMapping("/tickets")
public class TicketListingController {

    @Autowired
    private TicketListingRepository ticketListingRepository;

    public TicketListingController(TicketListingRepository ticketListingRepository) {
        this.ticketListingRepository = ticketListingRepository;
    }

//    Basic CRUD Actions
    @GetMapping("/all")
    public List<TicketListing> getAll() {
        return ticketListingRepository.findAll();
    }

//    Insert just inserts data
    @PutMapping
    public TicketListing insert(@RequestBody TicketListing ticketListing) {
        ticketListing.setUpdatedAt(new Date());
        TicketListing newTicketListing = this.ticketListingRepository.insert(ticketListing);
        return newTicketListing;
    }

//    Save performs insert and update
    @PostMapping
    public TicketListing update(@RequestBody TicketListing ticketListing) {
        ticketListing.setUpdatedAt(new Date());
        TicketListing newTicketListing = this.ticketListingRepository.save(ticketListing);
        return newTicketListing;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.ticketListingRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<TicketListing> getById(@PathVariable("id") String id) {
        Optional<TicketListing> ticket = this.ticketListingRepository.findById(id);
        if (ticket.equals(null)) {
            throw new NotFoundException("Ticket Not Found");
        }
        return ticket;
    }

//    Filtering Actions
//    Get all tickets by event id
    @GetMapping("/event/{id}")
    public List<TicketListing> getTicketListingsByEvent(@PathVariable String id) {
        return ticketListingRepository.findByEvent(id);
    }

//    Get all tickets by user id
    @GetMapping("/user/{id}")
    public List<TicketListing> getTicketListingsByUser(@PathVariable String id) {
        return ticketListingRepository.findByUser(id);
    }

//    Get all tickets by state
    @GetMapping("/state/{state}")
    public List<TicketListing> getTicketsByState(@PathVariable String state) {
        return this.ticketListingRepository.findByState(state);
    }

//    Get all tickets by city
    @GetMapping("/city/{city}")
    public List<TicketListing> getTicketsByCity(@PathVariable String city) {
        return this.ticketListingRepository.findByCity(city);
    }

//    Get all tickets by category
    @GetMapping("/category/{id}")
    public List<TicketListing> getTicketsByCategory(@PathVariable String id) {
        return this.ticketListingRepository.findByEventCategories(id);
    }

}
