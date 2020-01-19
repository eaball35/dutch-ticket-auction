package com.TicketTime.TicketTime.repository;

import com.TicketTime.TicketTime.model.Event;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository <Event, String> {
    Optional<Event> findById(String id);
    Optional<Event> findByEventfulId(String eventfulId);

    @Query("{'Categories.type':?0 , 'Categories.genre':?1}")
    List<Event> findByCategoriesByTypeAndGenre(String type, String genre);

    @Query("{'Categories.type':?0}")
    List<Event> findByCategoriesType(String type);

    @Query("{'Categories.genre':?0}")
    List<Event> findByCategoriesGenre(String genre);

    @Query("{'Venue.id':?0}")
    List<Event> findByVenue(String id);

    @Query("{'Venue.Address.City.name':?0}")
    List<Event> findByVenueAddressCityName(String city);

    @Query("{'Venue.Address.City.state':?0}")
    List<Event> findByVenueAddressCityState(String state);

    @Query("{'Performer.id':?0}")
    List<Event> findByPerformer(String id);
}
