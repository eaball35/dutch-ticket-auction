package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = { "http://localhost:3000"})
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

    @RequestMapping("/search/{keyword}/{location}")
    public String searchEventInfo(@PathVariable("keyword") String keyword, @PathVariable("location") String location) {
        String base = "http://api.eventful.com/json/events/search?";
        String kw = "q=title:" + keyword + "+||+description:" + keyword;
        String loc = "&l=" + location;

        String url = base + kw + loc + "&app_key=" + apiKey;
        System.out.println(url);
        String response = restTemplate.getForObject(url, String.class);
        return response;
    }

}

