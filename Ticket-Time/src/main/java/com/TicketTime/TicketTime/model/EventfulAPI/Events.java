package com.TicketTime.TicketTime.model.EventfulAPI;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Events {

    private List<Detail> event;

    public Events() {
    }

    public List<Detail> getEvent() {
        return event;
    }

    public void setEvent(List<Detail> event) {
        this.event = event;
    }

    @Override
    public String toString() {
        return "Events{" +
                "event=" + event +
                '}';
    }
}