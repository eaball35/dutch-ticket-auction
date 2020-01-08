package com.TicketTime.TicketTime.order;

import com.TicketTime.TicketTime.location.Location;
import com.TicketTime.TicketTime.ticketListing.TicketListing;
import com.TicketTime.TicketTime.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Document
public class Order {
    @Id
    private String id;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private final User user;
    @NotBlank
    private final TicketListing ticketListing;
    @NotBlank
    private final Double strikePrice;
    @NotBlank
    private final Double totalCost;
    private final String ccDetails;
    private final Location shippingAddress;

    public Order(User user, TicketListing ticketListing, Double strikePrice, Double totalCost, String ccDetails, Location shippingAddress) {
        this.user = user;
        this.ticketListing = ticketListing;
        this.strikePrice = strikePrice;
        this.totalCost = totalCost;
        this.ccDetails = ccDetails;
        this.shippingAddress = shippingAddress;
    }

    public String getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public User getUser() {
        return user;
    }

    public TicketListing getTicketListing() {
        return ticketListing;
    }

    public Double getStrikePrice() {
        return strikePrice;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public String getCcDetails() {
        return ccDetails;
    }

    public Location getShippingAddress() { return shippingAddress; }

    public void setId(String id) {
        this.id = id;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", user=" + user +
                ", ticketListing=" + ticketListing +
                ", strikePrice=" + strikePrice +
                ", totalCost=" + totalCost +
                ", ccDetails='" + ccDetails + '\'' +
                ", shippingAddress=" + shippingAddress +
                '}';
    }
}


