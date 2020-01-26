package com.TicketTime.TicketTime.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown=true)
public class GeoCodeGeometry {

    @JsonProperty(value="results")
    GeoCodeLocation[] geoCodingGeometry;
    
    public GeoCodeLocation[] getGeoCodingGeometry() {
        return geoCodingGeometry;
    }

    public void setGeoCodingGeometry(GeoCodeLocation[] geoCodingGeometry) {
        this.geoCodingGeometry = geoCodingGeometry;
    }

    @Override
    public String toString() {
        return "GeoCoding [geoCodingGeometry=" + geoCodingGeometry + "]";
    }
}
