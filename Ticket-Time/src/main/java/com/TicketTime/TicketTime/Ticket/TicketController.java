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
        return ticketRepository.findAll();
    }

//    Instert just insterts data
    @PutMapping
    public String insert(@RequestBody Ticket ticket) {
        Ticket newTicket = this.ticketRepository.insert(ticket);
        return newTicket.getId();
    }

//    Save can perform insert or update
    @PostMapping
    public String update(@RequestBody Ticket ticket) {
        Ticket newTicket = this.ticketRepository.save(ticket);
        return newTicket.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.ticketRepository.deleteById(id);
    }


    @GetMapping("/{id}")
    public Optional<Ticket> getById(@PathVariable("id") String id) {
        Optional<Ticket> ticket = this.ticketRepository.findById(id);
        if (ticket.isEmpty()) {
            throw new TicketNotFoundException("Ticket Not Found");
        }
        return ticket;
    }
}
