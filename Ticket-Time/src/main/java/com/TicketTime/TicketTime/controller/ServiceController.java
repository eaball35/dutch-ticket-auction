package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.Category;
import com.TicketTime.TicketTime.model.City;
import com.TicketTime.TicketTime.model.Venue;
import com.TicketTime.TicketTime.repository.CategoryRepository;
import com.TicketTime.TicketTime.repository.CityRepository;
import com.TicketTime.TicketTime.repository.VenueRepository;
import com.TicketTime.TicketTime.service.Service;
import com.TicketTime.TicketTime.model.TicketListing;
import com.TicketTime.TicketTime.repository.TicketListingRepository;
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
    private Service service = new Service();

    public ServiceController(TicketListingRepository ticketListingRepository, CategoryRepository categoryRepository, CityRepository cityRepository, VenueRepository venueRepository) {
        this.ticketListingRepository = ticketListingRepository;
        this.categoryRepository = categoryRepository;
        this.cityRepository = cityRepository;
        this.venueRepository = venueRepository;
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
            } else if (tickets.get(i).getOverview().toUpperCase().contains(q.toUpperCase()) || tickets.get(i).getEvent().getPerformer().get(0).getName().toUpperCase().contains(q.toUpperCase()) || tickets.get(i).getEvent().getPerformer().get(0).getDescription().toUpperCase().contains(q.toUpperCase())) {
                returnListings.add(tickets.get(i));
                continue;
            } else if (tickets.get(i).getEvent().getVenue().getTitle().toUpperCase().contains(q.toUpperCase()) || tickets.get(i).getEvent().getVenue().getDescription().toUpperCase().contains(q.toUpperCase())) {
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
    public List<Venue> venueExist(@RequestParam (value="title") String title, @RequestParam (value="zipCode") String zipCode) {
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

}
