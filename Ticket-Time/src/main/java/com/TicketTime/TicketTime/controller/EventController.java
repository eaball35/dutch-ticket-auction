package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.Event;
import com.TicketTime.TicketTime.model.Performer;
import com.TicketTime.TicketTime.repository.EventRepository;
import com.TicketTime.TicketTime.exception.NotFoundException;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.repository.query.Param;
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
    
    @GetMapping
    public List<Event> getEventsByGroup(@RequestParam(value="state", required = false) String state, @RequestParam(value="city", required = false) String city, @RequestParam(value="venue", required = false) String venueId, @RequestParam(value="performer", required = false) String performerId) {
        if(state!= null && city == null && venueId == null && performerId == null){
            return eventRepository.findByVenueAddressCityState(state);
        } else if(state== null && city != null && venueId == null && performerId == null) {
            return eventRepository.findByVenueAddressCityName(city);
        } else if (state == null && city == null && venueId != null && performerId == null ) {
            return eventRepository.findByVenue(venueId);
        } else if (state== null && city == null && venueId == null && performerId != null) {
            return eventRepository.findByPerformer(performerId);
        } else {
            return eventRepository.findAll();
        }
    }

    @GetMapping("/category")
    public List<Event> getEventsByCategory(@RequestParam(value="type", required = false) String type, @RequestParam(value="genre", required = false) String genre) {
        if(type != null && genre != null ) {
            return eventRepository.findByCategoriesByTypeAndGenre(type, genre);
        } else if (type != null && genre == null) {
            return eventRepository.findByCategoriesType(type);
        } else if (type == null && genre != null) {
            return eventRepository.findByCategoriesGenre(type);
        } else {
            return eventRepository.findAll();
        }
    }


}


