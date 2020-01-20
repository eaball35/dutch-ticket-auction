package com.TicketTime.TicketTime.model;
import org.joda.time.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashMap;
import org.joda.time.DateTime;

@Document
public class TicketListing {
    @Id
    private String id;
    @NotBlank
    private Date createdAt = new Date();
    @NotBlank
    private Date updatedAt = new Date();
    @NotBlank
    private String status = "new";

    @NotBlank
    private final User user;
    @NotBlank
    private final Event event;
    @NotBlank
    private final Integer ticketQuantity;
    @NotBlank
    private final String ticketGrouping;
    @NotBlank
    private final DateTime auctionStart;
    @NotBlank
    private final DateTime auctionEnd;
    @NotBlank
    private final Double startTotalPrice;
    @NotBlank
    private final Double endTotalPrice;
    @NotBlank
    private final String auctionDetails;
    @NotBlank
    private final String pitch;

    public TicketListing(@NotBlank User user, @NotBlank Event event, @NotBlank Integer ticketQuantity, @NotBlank String ticketGrouping, @NotBlank DateTime auctionStart , @NotBlank DateTime auctionEnd, @NotBlank Double startTotalPrice, @NotBlank Double endTotalPrice, @NotBlank String auctionDetails, @NotBlank String pitch) {
        this.user = user;
        this.event = event;
        this.ticketQuantity = ticketQuantity;
        this.ticketGrouping = ticketGrouping;

        if (auctionEnd == null) {
            this.auctionEnd = new DateTime();
        } else {
            this.auctionEnd = auctionEnd;
        }
        if (auctionStart == null) {
            this.auctionStart = new DateTime();
        } else {
            this.auctionStart = auctionStart;
        }
        this.startTotalPrice = startTotalPrice;
        this.endTotalPrice = endTotalPrice;
        this.auctionDetails = auctionDetails;
        this.pitch = pitch;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public Event getEvent() {
        return event;
    }

    public Integer getTicketQuantity() {
        return ticketQuantity;
    }

    public String getTicketGrouping() {
        return ticketGrouping;
    }

    public DateTime getAuctionStart() {
        return auctionStart;
    }

    public DateTime getAuctionEnd() {
        return auctionEnd;
    }

    public Double getStartTotalPrice() {
        return startTotalPrice;
    }

    public Double getEndTotalPrice() {
        return endTotalPrice;
    }

    public String getAuctionDetails() {
        return auctionDetails;
    }

    public String getPitch() {
        return pitch;
    }

    public HashMap<String, Object> calculatePrice() {
        HashMap<String, Object> resultTable = new HashMap<String, Object>();

        double startPrice = this.startTotalPrice;
        double endPrice = this.endTotalPrice;
        Instant start = this.auctionStart.toInstant();
        Instant end = this.auctionEnd.toInstant();
        Instant currentTime = new DateTime().toInstant();
        resultTable.put("strikeTime", currentTime);

        int betweenHours = Hours.hoursBetween(start, end).getHours();
        int betweenMinutes = Minutes.minutesBetween(start, end).getMinutes() % 60;
        double totalTimeUnits = betweenHours + (betweenMinutes/60.00);

        int passHours = Hours.hoursBetween(start, currentTime).getHours();
        int passMinutes = Minutes.minutesBetween(start, currentTime).getMinutes() % 60;
        double passedTimeUnits = passHours + (passMinutes/60.00);
        double leftTimeUnits = totalTimeUnits - passedTimeUnits;

        double totalCost = startPrice - endPrice;
        double pricePerTimeUnit = totalCost/totalTimeUnits;
        double currentCost = leftTimeUnits * pricePerTimeUnit;
        resultTable.put("currentPrice", currentCost);

        return resultTable;
    }

    @Override
    public String toString() {
        return "TicketListing{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", status='" + status + '\'' +
                ", user=" + user +
                ", event=" + event +
                ", ticketQuantity=" + ticketQuantity +
                ", ticketGrouping='" + ticketGrouping + '\'' +
                ", auctionStart=" + auctionStart +
                ", auctionEnd=" + auctionEnd +
                ", startTotalPrice=" + startTotalPrice +
                ", endTotalPrice=" + endTotalPrice +
                ", auctionDetails='" + auctionDetails + '\'' +
                ", pitch='" + pitch + '\'' +
                '}';
    }
}

