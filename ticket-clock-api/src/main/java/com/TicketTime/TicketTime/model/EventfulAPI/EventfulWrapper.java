package com.TicketTime.TicketTime.model.EventfulAPI;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EventfulWrapper {

    private Events events;

    public EventfulWrapper() {
    }

    public Events getEvents() {
        return events;
    }

    public void setEvents(Events events) {
        this.events = events;
    }

    @Override
    public String toString() {
        return "EventfulWrapper{" +
                "events=" + events +
                '}';
    }
}