package com.TicketTime.TicketTime.ticketListing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketListingRepository extends MongoRepository<TicketListing, String> {
    Optional<TicketListing> findById(String id);
//    List<TicketListing> findByEventState(String eventState);
//    List<TicketListing> findByEventCity(String eventCity);
}