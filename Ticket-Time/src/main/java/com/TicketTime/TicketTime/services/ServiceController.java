package com.TicketTime.TicketTime.services;

import com.TicketTime.TicketTime.category.Category;
import com.TicketTime.TicketTime.category.CategoryRepository;
import com.TicketTime.TicketTime.ticketListing.TicketListing;
import com.TicketTime.TicketTime.ticketListing.TicketListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    private ListService listService = new ListService();

    public ServiceController(TicketListingRepository ticketListingRepository, CategoryRepository categoryRepository) {
        this.ticketListingRepository = ticketListingRepository;
        this.categoryRepository = categoryRepository;
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
        return this.listService.listUniqueCategory(categories);
    }
}
