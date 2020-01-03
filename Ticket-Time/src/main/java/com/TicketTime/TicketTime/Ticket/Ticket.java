package com.TicketTime.TicketTime.Ticket;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;
import java.util.Date;

@Document
public class Ticket {
    @Id
    private String id;
    private Date createdAt;
    private final Integer userId;

    private final String artist;
    private final String event;
    private final String eventImgUrls;
    private final String eventLocation;
    private final String eventCity;
    private final String eventState;
    private final Date eventStart;
    private final Date eventEnd;
    private final String eventDetails;

    private final Integer ticketQuantity;
    private final String ticketGrouping;
    private final String ticketDetails;

    private final Double auctionStartTotalPrice;
    private final Date auctionStart;
    private final Double auctionEndTotalPrice;
    private final Date auctionEnd;
    private final String auctionOverview;
    private final String auctionDetails;

    public Ticket(String id, Integer userId, String artist, String event, String eventImgUrls, String eventLocation, String eventCity, String eventState, Date eventStart, Date eventEnd, String eventDetails, Integer ticketQuantity, String ticketGrouping, String ticketDetails, Double auctionStartTotalPrice, Date auctionStart, Double auctionEndTotalPrice, Date auctionEnd, String auctionOverview, String auctionDetails) {
        this.id = id;
        this.createdAt = new Date();
        this.userId = userId;

        this.artist = artist;
        this.event = event;
        this.eventImgUrls = eventImgUrls;
        this.eventLocation = eventLocation;
        this.eventCity = eventCity;
        this.eventState = eventState;
        this.eventStart = eventStart;
        this.eventEnd = eventEnd;
        this.eventDetails = eventDetails;

        this.ticketQuantity = ticketQuantity;
        this.ticketGrouping = ticketGrouping;
        this.ticketDetails = ticketDetails;

        this.auctionStartTotalPrice = auctionStartTotalPrice;
        this.auctionStart = auctionStart;
        this.auctionEndTotalPrice = auctionEndTotalPrice;
        this.auctionEnd = auctionEnd;
        this.auctionOverview = auctionOverview;
        this.auctionDetails = auctionDetails;
    }

    public Date getCreatedAt() {
        return createdAt;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getArtist() {
        return artist;
    }

    public String getEvent() {
        return event;
    }

    public String getEventImgUrls() {
        return eventImgUrls;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public String getEventCity() {
        return eventCity;
    }

    public String getEventState() {
        return eventState;
    }

    public Date getEventStart() {
        return eventStart;
    }

    public Date getEventEnd() {
        return eventEnd;
    }

    public String getEventDetails() {
        return eventDetails;
    }

    public Integer getTicketQuantity() {
        return ticketQuantity;
    }

    public String getTicketGrouping() {
        return ticketGrouping;
    }

    public String getTicketDetails() {
        return ticketDetails;
    }

    public Double getAuctionStartTotalPrice() {
        return auctionStartTotalPrice;
    }

    public Date getAuctionStart() {
        return auctionStart;
    }

    public Double getAuctionEndTotalPrice() {
        return auctionEndTotalPrice;
    }

    public Date getAuctionEnd() {
        return auctionEnd;
    }

    public String getAuctionOverview() {
        return auctionOverview;
    }

    public String getAuctionDetails() {
        return auctionDetails;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + id +
                ", createdAt=" + createdAt +
                ", userId=" + userId +
                ", artist='" + artist + '\'' +
                ", event='" + event + '\'' +
                ", eventImgUrls='" + eventImgUrls + '\'' +
                ", eventLocation='" + eventLocation + '\'' +
                ", eventCity='" + eventCity + '\'' +
                ", eventState='" + eventState + '\'' +
                ", eventStart=" + eventStart +
                ", eventEnd=" + eventEnd +
                ", eventDetails='" + eventDetails + '\'' +
                ", ticketQuantity=" + ticketQuantity +
                ", ticketGrouping='" + ticketGrouping + '\'' +
                ", ticketDetails='" + ticketDetails + '\'' +
                ", auctionStartTotalPrice=" + auctionStartTotalPrice +
                ", auctionStart=" + auctionStart +
                ", auctionEndTotalPrice=" + auctionEndTotalPrice +
                ", auctionEnd=" + auctionEnd +
                ", auctionOverview='" + auctionOverview + '\'' +
                ", auctionDetails='" + auctionDetails + '\'' +
                '}';
    }
}

