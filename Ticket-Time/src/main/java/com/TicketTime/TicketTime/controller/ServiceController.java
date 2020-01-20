package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.exception.NotFoundException;
import com.TicketTime.TicketTime.model.*;
import com.TicketTime.TicketTime.repository.*;
import com.TicketTime.TicketTime.service.Service;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin
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

    @GetMapping("/price")
    public HashMap<String, Object> getCurrentPrice(@RequestParam(value="id") String ticketListingId) {
        Optional<TicketListing> getTicket = this.ticketListingRepository.findById(ticketListingId);
        TicketListing ticket = getTicket.get();
        if (ticket != null) {
            return ticket.calculatePrice();
        }
        return null;
    }

    @GetMapping("/list/category")
    public HashMap<String, Set> listTypes() {
        List<Category> categories = this.categoryRepository.findAll();
        return this.service.listUniqueCategory(categories);
    }

    @GetMapping("/topcity")
    public City getTopCity(@RequestParam(value = "state") String state) {
        List<City> cities = cityRepository.findByState(state);

        int max = 0;
        City topCity = cities.get(0);

        for(int i = 0; i < cities.size(); i++) {
            String city = cities.get(i).getName();
            List<Event> events = eventRepository.findByVenueAddressCityName(city);
            if (events.size() > max) {
                max = events.size();
                topCity = cities.get(i);
            }
        }

        return topCity;
    }

    @GetMapping("/search")
    public List<Event> searchTicketListings(@RequestParam (value="q") String q) {
        String query = q.toUpperCase();
        List<Event> events = this.eventRepository.findAll();

        List<Event> returnEvents = new ArrayList<>();
        for(int i=0; i < events.size(); i++) {
            if(events.get(i).getTitle() != null) {
                if(events.get(i).getTitle().toUpperCase().contains(query)) {
                    returnEvents.add(events.get(i));
                    continue;
                }
            } else if(events.get(i).getDescription() != null) {
                if(events.get(i).getDescription().toUpperCase().contains(query)) {
                    returnEvents.add(events.get(i));
                    continue;
                }
            } else if(events.get(i).getVenue() != null && events.get(i).getVenue().getTitle() != null) {
                if(events.get(i).getVenue().getTitle().toUpperCase().contains(query)) {
                    returnEvents.add(events.get(i));
                    continue;
                }
            } else if(events.get(i).getVenue() != null && events.get(i).getVenue().getDescription() != null) {
                if(events.get(i).getVenue().getDescription().toUpperCase().contains(query)) {
                    returnEvents.add(events.get(i));
                    continue;
                }
            } else if(events.get(i).getVenue() != null && events.get(i).getVenue().getAddress() != null && events.get(i).getVenue().getAddress().getCity() != null ) {
                if (events.get(i).getVenue().getAddress().getCity().getName().toUpperCase().contains(query) || events.get(i).getVenue().getAddress().getCity().getState().toUpperCase().contains(query)) {
                    returnEvents.add(events.get(i));
                    continue;
                }

            } else if (events.get(i).getPerformer() != null && !events.get(i).getPerformer().isEmpty()) {
                List<Performer> performers = events.get(i).getPerformer();
                for (int pI = 0; pI < performers.size(); pI++) {
                    if (performers.get(pI).getName().toUpperCase().contains(query)) {
                        returnEvents.add(events.get(i));
                        continue;
                    }
                }
            } else if (events.get(i).getCategories() != null && !events.get(i).getCategories().isEmpty()) {
                List<Category> categories = events.get(i).getCategories();
                for (int cI = 0; cI < categories.size(); cI++) {
                    if (categories.get(i).getType() != null && categories.get(i).getGenre() != null ) {
                        if (categories.get(cI).getType().toUpperCase().contains(query) || categories.get(cI).getGenre().toUpperCase().contains(query)) {
                            returnEvents.add(events.get(i));
                            continue;
                        }
                    }
                }
            }
        }
        return returnEvents;
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


    @GetMapping("/findCity")
    public City findCity(@RequestParam (value="name") String name, @RequestParam (value="state") String state) {
        if(name.equals("") && state.equals("")) {
            return null;
        }
        List<City> cities = this.cityRepository.findAll();

        for(int i = 0; i < cities.size(); i++) {
            String cityName = cities.get(i).getName().toUpperCase();
            String cityState = cities.get(i).getState().toUpperCase();
            if (cityName.contains(name.toUpperCase()) && cityState.contains((state.toUpperCase())) ) {
                return cities.get(i);
            }
        }
        return null;
    }


    @GetMapping("/findCategory")
    public Category findCategory(@RequestParam (value="type") String type, @RequestParam (value="genre") String genre) {
        if(type.equals("") && genre.equals("")) {
            return null;
        }
        List<Category> categories = this.categoryRepository.findAll();

        for(int i = 0; i < categories.size(); i++) {
            String catType = categories.get(i).getType().toUpperCase();
            String catGenre = categories.get(i).getGenre().toUpperCase();
            if (catType.contains(type.toUpperCase()) && catGenre.contains((genre.toUpperCase())) ) {
                return categories.get(i);
            }
        }
        return null;
    }
}
