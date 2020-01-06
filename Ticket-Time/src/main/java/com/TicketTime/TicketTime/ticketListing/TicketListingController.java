package com.TicketTime.TicketTime.ticketListing;

import com.TicketTime.TicketTime.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/tickets")
public class TicketListingController {

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
    public String insert(@RequestBody TicketListing ticketListing) {
        TicketListing newTicketListing = this.ticketListingRepository.insert(ticketListing);
        return newTicketListing.getId();
    }

//    Save performs insert and update
    @PostMapping
    public String update(@RequestBody TicketListing ticketListing) {
        TicketListing newTicketListing = this.ticketListingRepository.save(ticketListing);
        return newTicketListing.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.ticketListingRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<TicketListing> getById(@PathVariable("id") String id) {
        Optional<TicketListing> ticket = this.ticketListingRepository.findById(id);
        if (ticket.isEmpty()) {
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
}
