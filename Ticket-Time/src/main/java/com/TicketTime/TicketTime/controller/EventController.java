package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.Event;
import com.TicketTime.TicketTime.model.Performer;
import com.TicketTime.TicketTime.repository.EventRepository;
import com.TicketTime.TicketTime.exception.NotFoundException;
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

//    CRUD Actions
    @GetMapping("/all")
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Event> getById(@PathVariable("id") String id) {
        Optional<Event> event = this.eventRepository.findById(id);
        if (event.isEmpty()) {
            throw new NotFoundException("Event Not Found");
        }
        return event;
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

//    Filter Actions
//    Get all events by venue id
    @GetMapping("/venue/{id}")
    public List<Event> getEventsByVenue(@PathVariable String id) {
        return eventRepository.findByVenue(id);
    }

    @GetMapping("/performer/{id}")
    public List<Event> getEventsByPerformer(@PathVariable String id) {
        return eventRepository.findByPerformer(id);
    }

    //   Get all events by category genre
    @GetMapping("/category/{type}/{genre}")
    public List<Event> getEventsByCategoryGenre(@PathVariable String type, @PathVariable String genre) {
        return eventRepository.findByCategoriesByTypeAndGenre(type, genre);
    }

//    Get all events by category type
    @GetMapping("/category/{type}")
    public List<Event> getEventsByCategoryType(@PathVariable String type) {
        return eventRepository.findByCategoriesType(type);
    }

    @GetMapping("/city/{city}")
    public List<Event> getEventsByCity(@PathVariable String city) {
        return eventRepository.findByVenueAddressCityName(city);
    }
}


