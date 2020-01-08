package com.TicketTime.TicketTime.repository;
import com.TicketTime.TicketTime.model.TicketListing;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketListingRepository extends MongoRepository<TicketListing, String> {
    Optional<TicketListing> findById(String id);

    @Query("{'Event.Venue.state':?0}")
    List<TicketListing> findByState(String State);

    @Query("{'Event.Venue.city':?0}")
    List<TicketListing> findByCity(String City);

    @Query("{'Event.id':?0}")
    List<TicketListing> findByEvent(String id);

    @Query("{'User.id':?0}")
    List<TicketListing> findByUser(String id);

    @Query("{'Event.Categories.id':?0}")
    List<TicketListing> findByEventCategories(String id);
}