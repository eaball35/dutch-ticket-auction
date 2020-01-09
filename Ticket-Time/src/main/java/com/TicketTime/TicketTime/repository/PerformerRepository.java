package com.TicketTime.TicketTime.repository;

import com.TicketTime.TicketTime.model.Order;
import com.TicketTime.TicketTime.model.Performer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PerformerRepository extends MongoRepository <Performer, String> {
    Optional<Performer> findById(String id);
}
