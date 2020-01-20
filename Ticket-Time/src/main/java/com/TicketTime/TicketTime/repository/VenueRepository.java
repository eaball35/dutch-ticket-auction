package com.TicketTime.TicketTime.repository;

import com.TicketTime.TicketTime.model.Venue;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VenueRepository extends MongoRepository <Venue, String> {
    Optional<Venue> findById(String id);

    Optional<Venue> findByEventfulId(String eventfulId);
}
