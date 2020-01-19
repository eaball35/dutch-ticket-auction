package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.City;
import com.TicketTime.TicketTime.repository.CityRepository;
import com.TicketTime.TicketTime.exception.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/cities")
public class CityController {

    private CityRepository cityRepository;

    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    //    CRUD Actions
    @GetMapping("/all")
    public List<City> getAll() {
        return cityRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<City> getById(@PathVariable("id") String id) {
        Optional<City> city = this.cityRepository.findById(id);
        if (city.equals(null)) {
            throw new NotFoundException("City Not Found");
        }
        return city;
    }

    @PutMapping
    public City insert(@RequestBody City city) {
        City newCity = this.cityRepository.insert(city);
        return newCity;
    }

    @PostMapping
    public City update(@RequestBody City city) {
        City newCity = this.cityRepository.save(city);
        return newCity;
    }

    @GetMapping
    public Optional<City> getByName(@RequestParam(value = "name") String name) {
        Optional<City> city = this.cityRepository.findByName(name.toUpperCase());
        if (city.equals(null)) {
            throw new NotFoundException("City Not Found");
        }
        return city;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.cityRepository.deleteById(id);
    }

    @GetMapping("/state/{state}")
    public List<City> getByState(@PathVariable("state") String state) {
        List<City> cities = this.cityRepository.findByState(state);
        if (cities.equals(null)) {
            throw new NotFoundException("State Not Found");
        }
        return cities;
    }
}



