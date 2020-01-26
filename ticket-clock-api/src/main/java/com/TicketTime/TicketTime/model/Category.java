package com.TicketTime.TicketTime.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Date;

@Document
public class Category {
    @Id
    private String id;
    @NotBlank
    private Date createdAt = new Date();
    @NotBlank
    private Date updatedAt = new Date();

    private String type;
    private String genre;

    private final ArrayList<String> imageUrls;

    public Category(String type, String genre, ArrayList<String> imageUrls) {
        this.type = type;
        this.genre = genre;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public ArrayList<String> getImageUrls() {
        return imageUrls;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", type='" + type + '\'' +
                ", genre='" + genre + '\'' +
                ", imageUrls=" + imageUrls +
                '}';
    }
}

