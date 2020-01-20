package com.TicketTime.TicketTime.model;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Date;

public class Performer {
    @Id
    private String id;
    @NotBlank
    private Date createdAt = new Date();
    @NotBlank
    private Date updatedAt = new Date();
    private final String name;
    private final String description;
    private final String eventfulId;
    private final ArrayList<String> imageUrls;

    public Performer(String name, String description, String eventfulId, ArrayList<String> imageUrls) {
        this.name = name;
        this.description = description;
        this.eventfulId = eventfulId;
        this.imageUrls = imageUrls;
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

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getEventfulId() {
        return eventfulId;
    }

    public ArrayList<String> getImageUrls() {
        return imageUrls;
    }

    @Override
    public String toString() {
        return "Performer{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", eventfulId='" + eventfulId + '\'' +
                ", imageUrls=" + imageUrls +
                '}';
    }
}
