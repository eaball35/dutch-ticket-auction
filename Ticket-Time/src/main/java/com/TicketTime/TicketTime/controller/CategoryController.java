package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.model.Category;
import com.TicketTime.TicketTime.repository.CategoryRepository;
import com.TicketTime.TicketTime.exception.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://ticketclock.com")
@RestController
@RequestMapping("/categories")
public class CategoryController {

    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    //    CRUD Actions
    @GetMapping("/all")
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Category> getById(@PathVariable("id") String id) {
        Optional<Category> category = this.categoryRepository.findById(id);
        if (category.equals(null)) {
            throw new NotFoundException("Category Not Found");
        }
        return category;
    }

    @PutMapping
    public String insert(@RequestBody Category category) {
        Category newCategory = this.categoryRepository.insert(category);
        return newCategory.getId();
    }

    @PostMapping
    public String update(@RequestBody Category category) {
        Category newCategory = this.categoryRepository.save(category);
        return newCategory.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.categoryRepository.deleteById(id);
    }

    @GetMapping("type/{type}")
    public List<Category> getByType(@PathVariable("type") String type) {
        List<Category> categories = this.categoryRepository.findByType(type);
        if (categories.equals(null)) {
            throw new NotFoundException("Categories Not Found");
        }
        return categories;
    }
}



