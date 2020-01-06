package com.TicketTime.TicketTime.venue;
import com.TicketTime.TicketTime.event.Event;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Date;

@Document
public class Venue {
    @Id
    private String id;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private ArrayList<Event> event;

    private final String eventfulId;
    @NotBlank
    private final String title;
    private final String description;
    private final String address1;
    private final String getAddress2;
    @NotBlank
    private final String city;
    @NotBlank
    private final String state;
    @NotBlank
    private final String zipCode;
    private final String venueDetails;

    public Venue(String eventfulId, @NotBlank String title, String description, String address1, String getAddress2, @NotBlank String city, @NotBlank String state, @NotBlank String zipCode, String venueDetails) {
        this.eventfulId = eventfulId;
        this.title = title;
        this.description = description;
        this.address1 = address1;
        this.getAddress2 = getAddress2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.venueDetails = venueDetails;
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

    public ArrayList<Event> getEvent() {
        return event;
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

    public String getAddress1() {
        return address1;
    }

    public String getGetAddress2() {
        return getAddress2;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public String getVenueDetails() {
        return venueDetails;
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

    public void setEvent(ArrayList<Event> event) {
        this.event = event;
    }

    @Override
    public String toString() {
        return "Venue{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", event=" + event +
                ", eventfulId='" + eventfulId + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", address1='" + address1 + '\'' +
                ", getAddress2='" + getAddress2 + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", venueDetails='" + venueDetails + '\'' +
                '}';
    }
}

