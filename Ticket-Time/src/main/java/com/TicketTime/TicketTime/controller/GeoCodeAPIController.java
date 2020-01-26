package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.GeoCodeResults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@CrossOrigin(origins = "http://ticketclock.com")
@RestController
public class GeoCodeAPIController {

    private static final Logger log = LoggerFactory.getLogger(GeoCodeAPIController.class);
    private static final String GEOCODING_URI = "https://maps.googleapis.com/maps/api/geocode/json";


    @Value("${google.api.key}")
    private String apiKey;

    @RequestMapping("/getGeoCoding")
    public String getGeoCodingForLoc(@RequestParam(value = "address", defaultValue="silicon+valley") String address) {
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(GEOCODING_URI).queryParam("address", address)
                .queryParam("key", apiKey);
        String geoCodeResults = restTemplate.getForObject(builder.toUriString(), String.class);

        return geoCodeResults;
    }
}


