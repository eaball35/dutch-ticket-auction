package com.TicketTime.TicketTime.order;

import com.TicketTime.TicketTime.exceptions.NotFoundException;
import com.TicketTime.TicketTime.order.Order;
import com.TicketTime.TicketTime.order.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
@RequestMapping("/orders")
public class OrderController {

    private OrderRepository userRepository;

    public OrderController(OrderRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public List<Order> getAll() {
        return userRepository.findAll();
    }

    @PutMapping
    public String insert(@RequestBody Order order) {
        Order newUser = this.userRepository.insert(order);
        return newUser.getId();
    }

    @PostMapping
    public String update(@RequestBody Order order) {
        Order newUser = this.userRepository.save(order);
        return newUser.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.userRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Order> getById(@PathVariable("id") String id) {
        Optional<Order> ticket = this.userRepository.findById(id);
        if (ticket.isEmpty()) {
            throw new NotFoundException("Order Not Found");
        }
        return ticket;
    }
}
