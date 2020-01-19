package com.TicketTime.TicketTime.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Document
public class Event {
    @Id
    private String id;
    @NotBlank
    private Date createdAt = new Date();
    @NotBlank
    private Date updatedAt = new Date();
    private ArrayList<Category> categories;

    @NotBlank
    private final Venue venue;
    private final String eventfulId;
    @NotBlank
    private final String title;
    private final ArrayList<Performer> performer;
    @NotBlank
    private final String description;
    @NotBlank
    private final String start;
    @NotBlank
    private final String end;
    private final ArrayList<String> imageUrls;
    @NotBlank
    private final String allDay;
    private final String eventDetails;

    public Event(@NotBlank Venue venue, String eventfulId, @NotBlank String title, ArrayList<Performer> performer, @NotBlank String description, @NotBlank String start, @NotBlank String end, ArrayList<String> imageUrls, @NotBlank String allDay, String eventDetails) {
        this.venue = venue;
        this.eventfulId = eventfulId;
        this.title = title;
        this.performer = performer;
        this.description = description;
        this.start = start;
        this.end = end;
        this.imageUrls = imageUrls;
        this.allDay = allDay;
        this.eventDetails = eventDetails;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public ArrayList<Category> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<Category> categories) {
        this.categories = categories;
    }

    public Venue getVenue() {
        return venue;
    }

    public String getEventfulId() {
        return eventfulId;
    }

    public String getTitle() {
        return title;
    }

    public ArrayList<Performer> getPerformer() {
        return performer;
    }

    public String getDescription() {
        return description;
    }

    public String getStart() {
        return start;
    }

    public String getEnd() {
        return end;
    }

    public ArrayList<String> getImageUrls() {
        return imageUrls;
    }

    public String getAllDay() {
        return allDay;
    }

    public String getEventDetails() {
        return eventDetails;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", categories=" + categories +
                ", venue=" + venue +
                ", eventfulId='" + eventfulId + '\'' +
                ", title='" + title + '\'' +
                ", performer=" + performer +
                ", description='" + description + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                ", imageUrls=" + imageUrls +
                ", allDay='" + allDay + '\'' +
                ", eventDetails='" + eventDetails + '\'' +
                '}';
    }
}




