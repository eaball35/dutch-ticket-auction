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

//    @GetMapping("/tickets/{id}")
//    public Ticket getTicket(@PathVariable int id) {
//        Ticket ticket = service.findOne(id);
//
//        if (ticket == null) {
//            throw new TicketNotFoundException("id: " + id);
//        }
//        return ticket;
//    }

//    @DeleteMapping("/tickets/{id}")
//    public void deleteTicket(@PathVariable int id) {
//        Ticket ticket = service.deleteById(id);
//
//        if (ticket == null) {
//            throw new TicketNotFoundException("id: " + id);
//        }
//    }
//
//    @PostMapping("/tickets")
//    public ResponseEntity<Object> createTicket(@Valid @RequestBody Ticket ticket) {
//        Ticket savedTicket = service.save(ticket);
//
//        URI location = ServletUriComponentsBuilder.
//                fromCurrentRequest().
//                path("/{id}").
//                buildAndExpand(savedTicket.getId()).toUri();
//
//        return ResponseEntity.created(location).build();
//    }

}
