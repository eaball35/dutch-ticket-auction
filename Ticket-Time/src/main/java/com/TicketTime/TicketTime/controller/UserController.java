package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.exception.NotFoundException;
import com.TicketTime.TicketTime.model.User;
import com.TicketTime.TicketTime.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/users")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    //    Instert just insterts data
    @PutMapping
    public String insert(@RequestBody User user) {
        User newUser = this.userRepository.insert(user);
        return newUser.getId();
    }

    //    Save can perform insert or update
    @PostMapping
    public User update(@RequestBody User user) {
        User newUser = this.userRepository.save(user);
        return newUser;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.userRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<User> getById(@PathVariable("id") String id) {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            throw new NotFoundException("User Not Found");
        }
        return user;
    }

    @GetMapping("/email/{email}")
    public Optional<User> getByEmail(@PathVariable("email") String email) {
        Optional<User> user = this.userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new NotFoundException("User Not Found");
        }
        return user;
    }
}

