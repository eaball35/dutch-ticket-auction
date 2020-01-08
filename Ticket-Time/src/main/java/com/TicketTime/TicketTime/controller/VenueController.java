package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.exception.NotFoundException;
import com.TicketTime.TicketTime.model.Venue;
import com.TicketTime.TicketTime.repository.VenueRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/venues")
public class VenueController {

    private VenueRepository venueRepository;

    public VenueController(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    @GetMapping("/all")
    public List<Venue> getAll() {
        return venueRepository.findAll();
    }

    @PutMapping
    public String insert(@RequestBody Venue venue) {
        Venue newUser = this.venueRepository.insert(venue);
        return newUser.getId();
    }

    @PostMapping
    public String update(@RequestBody Venue venue) {
        Venue newUser = this.venueRepository.save(venue);
        return newUser.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.venueRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Venue> getById(@PathVariable("id") String id) {
        Optional<Venue> ticket = this.venueRepository.findById(id);
        if (ticket.isEmpty()) {
            throw new NotFoundException("Venue Not Found");
        }
        return ticket;
    }
}

