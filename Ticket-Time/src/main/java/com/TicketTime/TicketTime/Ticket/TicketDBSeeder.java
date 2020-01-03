package com.TicketTime.TicketTime.Ticket;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class TicketDBSeeder implements CommandLineRunner {
    private TicketRepository ticketRepository;

    public TicketDBSeeder(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Ticket orangeTicket = new Ticket("1",
                1,
                "Cool Artist",
                "Example Event",
                "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                "Concert Hall",
                "Chicago",
                "IL",
                new Date(),
                new Date(),
                "Event Details here",
                2,
                "together",
                "Ticket Details Here",
                250.00,
                new Date(),
                5.2,
                new Date() ,
                "Auction Overview here",
                "Auction Details here"
        );

        Ticket blueTicket = new Ticket("2",
                2,
                "Super Artist",
                "TicketTime Event",
                "https://ca-times.brightspotcdn.com/dims4/default/9314eb0/2147483647/strip/true/crop/3795x2530+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa9%2F84%2Fec280a7a4b5f8e969e9c87036482%2F474823-me-common-concert-norco-prison-0106.JPG",
                "Event Place",
                "Denver",
                "CO",
                new Date(),
                new Date(),
                "Event Details here & Stuff",
                3,
                "together",
                "Ticket Details Here & Stuff & Things",
                500.00,
                new Date(),
                12.2,
                new Date() ,
                "Auction Overview here WOOO",
                "Auction Details here more stuff"
        );

////        delete all
//        this.ticketRepository.deleteAll();

//        add to db
        this.ticketRepository.save(orangeTicket);
        this.ticketRepository.save(blueTicket);
    }
}
