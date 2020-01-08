package com.TicketTime.TicketTime.repository;

import com.TicketTime.TicketTime.model.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends MongoRepository <Address, String> {
    Optional<Address> findById(String id);
}