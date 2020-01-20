package com.TicketTime.TicketTime.model.EventfulAPI;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Image {
    Medium medium;

    public Image() {
    }

    public Medium getMedium() {
        return medium;
    }

    public void setMedium(Medium medium) {
        this.medium = medium;
    }

    @Override
    public String toString() {
        return "Image{" +
                "medium=" + medium +
                '}';
    }
}
