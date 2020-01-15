package com.TicketTime.TicketTime.repository;

import com.TicketTime.TicketTime.model.City;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends MongoRepository <City, String> {
    Optional<City> findById(String id);
    Optional<City> findByName(String name);
    List<City> findByState(String state);
}