package com.TicketTime.TicketTime.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
    Optional<Ticket> findById(String id);
    List<Ticket> findByEventState(String eventState);

    List<Ticket> findByEventCity(String eventCity);
}