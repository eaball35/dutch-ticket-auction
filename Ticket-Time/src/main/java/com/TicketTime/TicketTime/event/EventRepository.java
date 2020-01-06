package com.TicketTime.TicketTime.event;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository <Event, String> {
    Optional<Event> findById(String id);

    @Query("{'Venue.id':?0}")
    List<Event> findByVenue(String id);
}
