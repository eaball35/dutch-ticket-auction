package com.TicketTime.TicketTime.model.EventfulAPI;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Medium {
    String url;

    public Medium() {
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Medium{" +
                "url='" + url + '\'' +
                '}';
    }
}
