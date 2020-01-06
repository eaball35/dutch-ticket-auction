package com.TicketTime.TicketTime.order;

import com.TicketTime.TicketTime.event.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository <Order, String> {
    Optional<Order> findById(String id);

    @Query("{'User.id':?0}")
    List<Order> findByUser(String id);

    @Query("{'TicketListing.id':?0}")
    Order findByTicketListing(String id);
}
