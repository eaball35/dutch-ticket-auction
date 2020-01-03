package com.TicketTime.TicketTime.Ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;
import java.net.URI;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class TicketResource {

    @Autowired
    private TicketService service;
    private TicketRepository ticketRepository;

    @GetMapping("/tickets")
    public List<Ticket> retrieveAllUsers() {
        return service.findAll();
    }

    @GetMapping("/tickets/{id}")
    public Ticket retrieveAllUsers(@PathVariable int id) {
        Ticket ticket = service.findOne(id);

        if (ticket == null) {
            throw new TicketNotFoundException("id: " + id);
        }
        return ticket;
    }

    @DeleteMapping("/tickets/{id}")
    public void deleteTicket(@PathVariable int id) {
        Ticket ticket = service.deleteById(id);

        if (ticket == null) {
            throw new TicketNotFoundException("id: " + id);
        }
    }

    @PostMapping("/tickets")
    public ResponseEntity<Object> createTicket(@Valid @RequestBody Ticket ticket) {
        Ticket savedTicket = service.save(ticket);

        URI location = ServletUriComponentsBuilder.
                fromCurrentRequest().
                path("/{id}").
                buildAndExpand(savedTicket.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

}
