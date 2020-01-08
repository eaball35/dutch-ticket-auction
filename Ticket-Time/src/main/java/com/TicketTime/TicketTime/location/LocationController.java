package com.TicketTime.TicketTime.location;

import com.TicketTime.TicketTime.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/locations")
public class LocationController {

    private LocationRepository locationRepository;

    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @GetMapping("/all")
    public List<Location> getAll() {
        return locationRepository.findAll();
    }

    @PutMapping
    public String insert(@RequestBody Location location) {
        Location newUser = this.locationRepository.insert(location);
        return newUser.getId();
    }

    @PostMapping
    public String update(@RequestBody Location location) {
        Location newUser = this.locationRepository.save(location);
        return newUser.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.locationRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Location> getById(@PathVariable("id") String id) {
        Optional<Location> ticket = this.locationRepository.findById(id);
        if (ticket.isEmpty()) {
            throw new NotFoundException("Location Not Found");
        }
        return ticket;
    }
}

