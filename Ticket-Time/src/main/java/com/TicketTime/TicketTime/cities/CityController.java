package com.TicketTime.TicketTime.cities;

import com.TicketTime.TicketTime.exceptions.NotFoundException;
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
        if (city.isEmpty()) {
            throw new NotFoundException("City Not Found");
        }
        return city;
    }

    @PutMapping
    public String insert(@RequestBody City city) {
        City newCategory = this.cityRepository.insert(city);
        return newCategory.getId();
    }

    @PostMapping
    public String update(@RequestBody City city) {
        City newCategory = this.cityRepository.save(city);
        return newCategory.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.cityRepository.deleteById(id);
    }
}



