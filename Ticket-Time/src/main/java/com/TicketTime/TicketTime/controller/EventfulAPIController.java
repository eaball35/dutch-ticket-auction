package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.EventfulAPI.EventfulWrapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://ticketclock.com")
@RestController
@RequestMapping("/eventful")
public class EventfulAPIController {

    @Value("${eventful.api.key}")
    private String apiKey;
    private RestTemplate restTemplate;

    public EventfulAPIController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @RequestMapping("/event/{eventfulId}")
    public String getEventInfo(@PathVariable("eventfulId") String eventfulId) {
        String url = "http://api.eventful.com/json/events/get?id=" + eventfulId + "&app_key=" + apiKey;
        String response = restTemplate.getForObject(url, String.class);
        return response;
    }

    @RequestMapping("/search")
    public EventfulWrapper searchEventInfo(@RequestParam( value = "category") String category, @RequestParam( value = "location") String location) {
        String base = "http://api.eventful.com/json/events/search?";
        String cat = "category=" + category;
        String loc = "&location=" + location;
        String sort = "&sort_order=popularity";

        String url = base + cat + loc + sort + "&app_key=" + apiKey;
        EventfulWrapper response = restTemplate.getForObject(url, EventfulWrapper.class);
        return response;
    }
}

