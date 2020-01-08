package com.TicketTime.TicketTime.address;

import com.TicketTime.TicketTime.cities.City;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Document
public class Address {
    @Id
    private String id;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();

    @NotBlank
    private final String address1;
    private final String address2;
    @NotBlank
    private final City city;
    private final String zipCode;


    public Address(String address1, String address2, City city, String zipCode) {
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.zipCode = zipCode;
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

    public String getAddress1() {
        return address1;
    }

    public String getAddress2() {
        return address2;
    }

    public City getCity() {
        return city;
    }

    public String getZipCode() {
        return zipCode;
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
        return "Address{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", address1='" + address1 + '\'' +
                ", address2='" + address2 + '\'' +
                ", city=" + city +
                ", zipCode='" + zipCode + '\'' +
                '}';
    }
}



