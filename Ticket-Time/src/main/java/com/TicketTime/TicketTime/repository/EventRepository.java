package com.TicketTime.TicketTime.repository;

import com.TicketTime.TicketTime.model.Event;
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

    @Query("{'Categories.type':?0 , 'Categories.genre':?1}")
    List<Event> findByCategoriesByTypeAndGenre(String Type, String genre);

    @Query("{'Categories.type':?0}")
    List<Event> findByCategoriesType(String type);

    @Query("{'Venue.Address.City.name':?0}")
    List<Event> findByVenueAddressCityName(String city);
}
