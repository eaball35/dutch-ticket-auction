package com.TicketTime.TicketTime.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
    Optional<Ticket> findById(String id);
}