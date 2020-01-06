package com.TicketTime.TicketTime.category;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Document
public class Category {
    @Id
    private String id;
    @NotBlank
    private Date createdAt = new Date();
    @NotBlank
    private Date updatedAt = new Date();

    @NotBlank
    private final String type;
    private final String genre;

    public Category(@NotBlank String type, String genre) {
        this.type = type;
        this.genre = genre;
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

    public String getType() {
        return type;
    }

    public String getGenre() {
        return genre;
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
        return "Category{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", type='" + type + '\'' +
                ", genre='" + genre + '\'' +
                '}';
    }
}

