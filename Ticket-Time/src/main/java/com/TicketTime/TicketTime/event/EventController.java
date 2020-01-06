package com.TicketTime.TicketTime.event;

import com.TicketTime.TicketTime.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/events")
public class EventController {

    private EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping("/all")
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @PutMapping
    public String insert(@RequestBody Event event) {
        Event newEvent = this.eventRepository.insert(event);
        return newEvent.getId();
    }

    @PostMapping
    public String update(@RequestBody Event event) {
        Event newEvent = this.eventRepository.save(event);
        return newEvent.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.eventRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Event> getById(@PathVariable("id") String id) {
        Optional<Event> event = this.eventRepository.findById(id);
        if (event.isEmpty()) {
            throw new NotFoundException("Event Not Found");
        }
        return event;
    }
}


