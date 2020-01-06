package com.TicketTime.TicketTime.order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository <Order, String> {
    Optional<Order> findById(String id);
}
