package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.Category;
import com.TicketTime.TicketTime.model.City;
import com.TicketTime.TicketTime.repository.CategoryRepository;
import com.TicketTime.TicketTime.repository.CityRepository;
import com.TicketTime.TicketTime.service.Service;
import com.TicketTime.TicketTime.model.TicketListing;
import com.TicketTime.TicketTime.repository.TicketListingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping
public class ServiceController {
    private TicketListingRepository ticketListingRepository;
    private CategoryRepository categoryRepository;
    private CityRepository cityRepository;
    private Service service = new Service();

    public ServiceController(TicketListingRepository ticketListingRepository, CategoryRepository categoryRepository, CityRepository cityRepository) {
        this.ticketListingRepository = ticketListingRepository;
        this.categoryRepository = categoryRepository;
        this.cityRepository = cityRepository;
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

}
