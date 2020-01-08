package com.TicketTime.TicketTime.ticketListing;
import com.TicketTime.TicketTime.event.Event;
import com.TicketTime.TicketTime.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashMap;

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
    private final Date auctionStart;
    @NotBlank
    private final Date auctionEnd;
    @NotBlank
    private final Double startTotalPrice;
    @NotBlank
    private final Double endTotalPrice;
    @NotBlank
    private final String auctionDetails;
    @NotBlank
    private final String overview;

    public TicketListing(@NotBlank User user, @NotBlank Event event, @NotBlank Integer ticketQuantity, @NotBlank String ticketGrouping, @NotBlank Date auctionStart, @NotBlank Date auctionEnd, @NotBlank Double startTotalPrice, @NotBlank Double endTotalPrice, @NotBlank String auctionDetails, @NotBlank String overview) {
        this.user = user;
        this.event = event;
        this.ticketQuantity = ticketQuantity;
        this.ticketGrouping = ticketGrouping;
        this.auctionStart = auctionStart;
        this.auctionEnd = auctionEnd;
        this.startTotalPrice = startTotalPrice;
        this.endTotalPrice = endTotalPrice;
        this.auctionDetails = auctionDetails;
        this.overview = overview;
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

    public String getStatus() {
        return status;
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

    public Date getAuctionStart() {
        return auctionStart;
    }

    public Date getAuctionEnd() {
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

    public String getOverview() {
        return overview;
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

    public void setStatus(String status) {
        this.status = status;
    }

    public HashMap<String, Object> calculatePrice() {
        double totalTimeUnits = this.auctionEnd.getTime() - this.auctionStart.getTime();
        Long currentTime = new Date(System.currentTimeMillis()).getTime();
        double passedTimeUnits = this.auctionEnd.getTime() - currentTime;
        double leftTimeUnits = totalTimeUnits - passedTimeUnits;
        double pricePerUnit = (this.startTotalPrice - this.endTotalPrice) / totalTimeUnits;
        Double currentPrice = leftTimeUnits * pricePerUnit;

        HashMap<String, Object> returnTable = new HashMap<>();
        returnTable.put("strikeTime", currentTime);
        returnTable.put("currentPrice", currentPrice);

        return returnTable;
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
                ", overview='" + overview + '\'' +
                '}';
    }
}

