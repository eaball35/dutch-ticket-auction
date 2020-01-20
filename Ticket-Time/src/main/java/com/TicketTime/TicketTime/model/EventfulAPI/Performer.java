package com.TicketTime.TicketTime.model.EventfulAPI;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Performer {
//    eventful performer id
    String id;
    String name;
//    performer description
    String short_bio;

    public Performer() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShort_bio() {
        return short_bio;
    }

    public void setShort_bio(String short_bio) {
        this.short_bio = short_bio;
    }

    @Override
    public String toString() {
        return "Performer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", short_bio='" + short_bio + '\'' +
                '}';
    }
}
