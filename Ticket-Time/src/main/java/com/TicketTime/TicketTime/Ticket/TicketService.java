package com.TicketTime.TicketTime.Ticket;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Date;

@Component
public class TicketService {
    private static List<Ticket> tickets = new ArrayList<>();
    private static int ticketCount = 1;

    static {
        tickets.add(new Ticket("1", 1, "Cool Artist", "Example Event", "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                "Concert Hall", "Chicago","IL", new Date(),
                new Date(), "Event Details here", 2, "together", "Ticket Details Here",
                250.00, new Date(), 5.2, new Date() ,"Auction Overview here",
                "Auction Details here"));
    }

    public List<Ticket> findAll() {
        return tickets;
    }

    public Ticket save(Ticket ticket) {
       if (ticket.getId() == null) {
           ticket.setId(Integer.toString(++ticketCount));
       }
       tickets.add(ticket);
       return ticket;
    }

    public  Ticket findOne(int id) {
        for (Ticket ticket : tickets) {
            if (ticket.getId().equals(id)) {
                return ticket;
            }
        }
        return null;
    }

    public  Ticket deleteById(int id) {
        Iterator<Ticket> iterator = tickets.iterator();
        while (iterator.hasNext()) {
            Ticket ticket = iterator.next();
            if (ticket.getId().equals(id)) {
                iterator.remove();
                return ticket;
            }
        }
        return null;
    }
}
