package com.TicketTime.TicketTime.repository;

import com.TicketTime.TicketTime.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository <Category, String> {
    Optional<Category> findById(String id);

    List<Category> findByType(String type);
}