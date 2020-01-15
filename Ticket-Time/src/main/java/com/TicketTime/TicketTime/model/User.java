package com.TicketTime.TicketTime.model;
import com.TicketTime.TicketTime.model.Address;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Document
public class User {
    @Id
    private String id;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private Date providerId;
    private String name;
    private Address address;

    @NotBlank
    private final String email;
    @NotBlank
    private final String username;


    public User( @NotBlank String email, String username, String name, Address address) {
        this.email = email;
        this.username = username;
        this.name = name;
        this.address = address;
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

    public Date getProviderId() {
        return providerId;
    }

    public void setProviderId(Date providerId) {
        this.providerId = providerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", providerId=" + providerId +
                ", name='" + name + '\'' +
                ", address=" + address +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}


