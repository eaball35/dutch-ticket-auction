package com.TicketTime.TicketTime.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown=true)
public class GeoCodeResults {
    String status;

    @JsonProperty(value="results")
    GeoCodeGeometry[] geoCodingResults;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public GeoCodeGeometry[] getGeoCodingResults() {
        return geoCodingResults;
    }

    public void setGeoCodingResults(GeoCodeGeometry[] geoCodingResults) {
        this.geoCodingResults = geoCodingResults;
    }

    @Override
    public String toString() {
        return "GeoCoding [status=" + status + ", geoCodingResults=" + geoCodingResults + "]";
    }
}
