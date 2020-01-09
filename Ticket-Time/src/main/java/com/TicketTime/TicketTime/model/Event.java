package com.TicketTime.TicketTime.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Date;

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
    private final Date start;
    @NotBlank
    private final Date end;
    private final ArrayList<String> imageUrls;
    @NotBlank
    private final Boolean allDay;
    private final String eventDetails;

    public Event(ArrayList<Category> categories, @NotBlank Venue venue, String eventfulId, @NotBlank String title, ArrayList<Performer> performer, @NotBlank String description, @NotBlank Date start, @NotBlank Date end, ArrayList<String> imageUrls, @NotBlank Boolean allDay, String eventDetails) {
        this.categories = categories;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public ArrayList<Category> getCategories() {
        return categories;
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

    public Date getStart() {
        return start;
    }

    public Date getEnd() {
        return end;
    }

    public ArrayList<String> getImageUrls() {
        return imageUrls;
    }

    public Boolean getAllDay() {
        return allDay;
    }

    public String getEventDetails() {
        return eventDetails;
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

    public void setCategories(ArrayList<Category> categories) {
        this.categories = categories;
    }
}




