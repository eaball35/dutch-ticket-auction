package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.*;
import com.TicketTime.TicketTime.repository.*;
import com.TicketTime.TicketTime.service.Service;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping
public class ServiceController {
    private TicketListingRepository ticketListingRepository;
    private CategoryRepository categoryRepository;
    private CityRepository cityRepository;
    private VenueRepository venueRepository;
    private EventRepository eventRepository;
    private Service service = new Service();

    public ServiceController(TicketListingRepository ticketListingRepository, CategoryRepository categoryRepository, CityRepository cityRepository, VenueRepository venueRepository, EventRepository eventRepository) {
        this.ticketListingRepository = ticketListingRepository;
        this.categoryRepository = categoryRepository;
        this.cityRepository = cityRepository;
        this.venueRepository = venueRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping("/price/{ticketListingId}")
    public HashMap<String, Object> getCurrentPrice(@PathVariable String ticketListingId) {
        Optional<TicketListing> getTicket = this.ticketListingRepository.findById(ticketListingId);
        TicketListing ticket = getTicket.get();
        return ticket.calculatePrice();
    }

    @GetMapping("/list/category")
    public HashMap<String, Set> listTypes() {
        List<Category> categories = this.categoryRepository.findAll();
        return this.service.listUniqueCategory(categories);
    }

    @GetMapping("/topcity/{state}")
    public String getTopTicketCityByState (@PathVariable String state) {
        List<City> cities = cityRepository.findByState(state);

        int max = 0;
        String topCity = null;
        for(int i = 0; i < cities.size(); i++) {
            String city = cities.get(i).getName();
            List<TicketListing> tickets = ticketListingRepository.findByCity(city);
            if (tickets.size() > max) {
                max = tickets.size();
                topCity = cities.get(i).getName();
            }
        }
        return topCity;
    }

    @GetMapping("/search")
    public List<TicketListing> searchTicketListings(@RequestParam (value="q") String q) {
        List<TicketListing> tickets = this.ticketListingRepository.findAll();

        List<TicketListing> returnListings = new ArrayList<>();
        for(int i=0; i < tickets.size(); i++) {
            if(tickets.get(i).getEvent().getTitle().toUpperCase().contains(q.toUpperCase()) || tickets.get(i).getEvent().getDescription().toUpperCase().contains(q.toUpperCase())) {
                returnListings.add(tickets.get(i));
                continue;
            } else if (tickets.get(i).getEvent().getPerformer().get(0).getName().toUpperCase().contains(q.toUpperCase()) || tickets.get(i).getEvent().getPerformer().get(0).getDescription().toUpperCase().contains(q.toUpperCase())) {
                returnListings.add(tickets.get(i));
                continue;
            } else if (tickets.get(i).getEvent().getVenue().getTitle().toUpperCase().contains(q.toUpperCase()) || tickets.get(i).getEvent().getVenue().getDescription().toUpperCase().contains(q.toUpperCase()) || tickets.get(i).getEvent().getVenue().getAddress().getCity().getName().toUpperCase().contains(q.toUpperCase())) {
                returnListings.add(tickets.get(i));
                continue;
            } else {
                for (int ind = 0; ind <tickets.get(i).getEvent().getCategories().size();
                ind++){
                    List<Category> categories = tickets.get(i).getEvent().getCategories();
                    if (categories.get(ind).getType().toUpperCase().contains(q.toUpperCase()) || categories.get(ind).getGenre().toUpperCase().contains(q.toUpperCase())) {
                        returnListings.add(tickets.get(i));
                        continue;
                    }
                }
            }
        }
        return returnListings;
    }

    @GetMapping("/findVenue")
    public List<Venue> findVenue(@RequestParam (value="title") String title, @RequestParam (value="zipCode") String zipCode) {
        if(title.equals("") && zipCode.equals("")) {
            return null;
        }
        List<Venue> venues = this.venueRepository.findAll();

        List<Venue> outputs = new ArrayList<Venue>();
        for(int i = 0; i < venues.size(); i++) {
            String venueTitle = venues.get(i).getTitle().toUpperCase();
            String venueZipCode = venues.get(i).getAddress().getZipCode().toUpperCase();
            if (venueTitle.contains(title.toUpperCase()) && venueZipCode.contains((zipCode.toUpperCase())) ) {
                outputs.add(venues.get(i));
            }
        }
        return outputs;
    }

    @GetMapping("/findEvent")
    public List<Event> findEvent(@RequestParam (value="title") String title, @RequestParam (value="performer") String performer) {
        if(title.equals("") && performer.equals("")) {
            return null;
        }
        List<Event> events = this.eventRepository.findAll();

        List<Event> outputs = new ArrayList<Event>();
        for(int i = 0; i < events.size(); i++) {
            String eventTitle = events.get(i).getTitle().toUpperCase();
            String eventPerformer = events.get(i).getPerformer().get(0).getName().toUpperCase();
            if (eventTitle.contains(title.toUpperCase()) && eventPerformer.contains((performer.toUpperCase())) ) {
                outputs.add(events.get(i));
            }
        }
        return outputs;
    }
}
