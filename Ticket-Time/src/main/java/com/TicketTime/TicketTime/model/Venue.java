package com.TicketTime.TicketTime.model;
import com.TicketTime.TicketTime.model.Address;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Document
public class Venue {
    @Id
    private String id;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private String eventfulId;

    @NotBlank
    private final String title;
    private final String description;
    private final String venueDetails;
    private final Address address;

    public Venue(String eventfulId, @NotBlank String title, String description, String venueDetails, Address address) {
        this.eventfulId = eventfulId;
        this.title = title;
        this.description = description;
        this.venueDetails = venueDetails;
        this.address = address;
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

    public String getEventfulId() {
        return eventfulId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getVenueDetails() {
        return venueDetails;
    }

    public Address getAddress() {
        return address;
    }

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
        return "Venue{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", eventfulId='" + eventfulId + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", venueDetails='" + venueDetails + '\'' +
                ", location=" + address +
                '}';
    }
}

