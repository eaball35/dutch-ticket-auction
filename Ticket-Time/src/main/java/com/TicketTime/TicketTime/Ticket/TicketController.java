package com.TicketTime.TicketTime.Ticket;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/tickets")
public class TicketController {

    private TicketRepository ticketRepository;

    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @GetMapping("/all")
    public List<Ticket> getAll() {
        System.out.println(ticketRepository);
        return ticketRepository.findAll();
    }

//    Instert just insterts data
    @PutMapping
    public void insert(@RequestBody Ticket ticket) {
        this.ticketRepository.insert(ticket);
    }

//    Save can perform insert or update
    @PostMapping
    public void update(@RequestBody Ticket ticket) {
        this.ticketRepository.save(ticket);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        this.ticketRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Ticket> getById(@PathVariable("id") String id) {
        Optional<Ticket> ticket = this.ticketRepository.findById(id);
        return ticket;
    }

    @GetMapping("/state/{eventState}")
    public List<Ticket> getByState(@PathVariable("eventState") String eventState) {
        List<Ticket> tickets = this.ticketRepository.findByEventState(eventState);
        return tickets;
    }

    @GetMapping("/city/{eventCity}")
    public List<Ticket> getByCity(@PathVariable("eventCity") String eventCity) {
        List<Ticket> tickets = this.ticketRepository.findByEventCity(eventCity);
        return tickets;
    }

}
