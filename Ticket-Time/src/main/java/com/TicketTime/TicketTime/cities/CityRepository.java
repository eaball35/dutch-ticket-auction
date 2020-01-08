package com.TicketTime.TicketTime.cities;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityRepository extends MongoRepository <City, String> {
    Optional<City> findById(String id);
}