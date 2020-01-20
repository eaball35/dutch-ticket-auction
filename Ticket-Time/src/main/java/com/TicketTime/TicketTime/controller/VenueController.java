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
    public Venue insert(@RequestBody Venue venue) {
        Venue newVenue = this.venueRepository.insert(venue);
        return newVenue;
    }

    @PostMapping
    public Venue update(@RequestBody Venue venue) {
        Venue newVenue = this.venueRepository.save(venue);
        return newVenue;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.venueRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Venue> getById(@PathVariable("id") String id) {
        Optional<Venue> venue = this.venueRepository.findById(id);
        if (venue.equals(null)) {
            throw new NotFoundException("Venue Not Found");
        }
        return venue;
    }

    @GetMapping
    public Optional<Venue> getByEventfulId(@RequestParam("eventfulId") String eventfulId) {
        Optional<Venue> venue = this.venueRepository.findByEventfulId(eventfulId);
        if (venue.equals(null)) {
            throw new NotFoundException("Venue Not Found");
        }
        return venue;
    }
}

