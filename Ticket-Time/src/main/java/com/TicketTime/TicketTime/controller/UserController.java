package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.exception.NotFoundException;
import com.TicketTime.TicketTime.exception.ResourceNotFoundException;
import com.TicketTime.TicketTime.model.User;
import com.TicketTime.TicketTime.repository.UserRepository;
import com.TicketTime.TicketTime.security.oauth2.CurrentUser;
import com.TicketTime.TicketTime.security.oauth2.UserPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

//    ADDED THIS!!!
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
//    ADDED ABOVE!!

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
    public String update(@RequestBody User user) {
        User newUser = this.userRepository.save(user);
        return newUser.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.userRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<User> getById(@PathVariable("id") String id) {
        Optional<User> ticket = this.userRepository.findById(id);
        if (ticket.isEmpty()) {
            throw new NotFoundException("User Not Found");
        }
        return ticket;
    }

    @GetMapping("/{email}")
    public Optional<User> getByEmail(@PathVariable("email") String email) {
        Optional<User> ticket = this.userRepository.findByEmail(email);
        if (ticket.isEmpty()) {
            throw new NotFoundException("User Not Found");
        }
        return ticket;
    }


}

