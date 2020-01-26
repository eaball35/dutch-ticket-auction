package com.TicketTime.TicketTime.model.EventfulAPI;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Performers {
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    ArrayList<Performer> performer;

    public Performers() {
    }

    public ArrayList<Performer> getPerformer() {
        return performer;
    }

    public void setPerformer(ArrayList<Performer> performer) {
        this.performer = performer;
    }

    @Override
    public String toString() {
        return "Performers{" +
                "performer=" + performer +
                '}';
    }
}
