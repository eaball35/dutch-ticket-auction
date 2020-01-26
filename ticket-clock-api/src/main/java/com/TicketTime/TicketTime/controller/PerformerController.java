package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.exception.NotFoundException;
import com.TicketTime.TicketTime.model.Order;
import com.TicketTime.TicketTime.model.Performer;
import com.TicketTime.TicketTime.repository.PerformerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://ticketclock.com")
@RestController
@RequestMapping("/performers")
public class PerformerController {

    private PerformerRepository performerRepository;

    public PerformerController(PerformerRepository performerRepository) {
        this.performerRepository = performerRepository;
    }

    @GetMapping("/all")
    public List<Performer> getAll() {
        return performerRepository.findAll();
    }

    @PutMapping
    public String insert(@RequestBody Performer performer) {
        Performer newPerformer = this.performerRepository.insert(performer);
        return newPerformer.getId();
    }

    @PostMapping
    public String update(@RequestBody Performer performer) {
        Performer newPerformer = this.performerRepository.save(performer);
        return newPerformer.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.performerRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Performer> getById(@PathVariable("id") String id) {
        Optional<Performer> performer = this.performerRepository.findById(id);
        if (performer.equals(null)) {
            throw new NotFoundException("Performer Not Found");
        }
        return performer;
    }

    @GetMapping
    public Optional<Performer> getByEventfulId(@RequestParam("eventfuId") String eventfuId) {
        Optional<Performer> performer = this.performerRepository.findByEventfulId(eventfuId);
        if (performer.equals(null)) {
            throw new NotFoundException("Performer Not Found");
        }
        return performer;
    }
}


