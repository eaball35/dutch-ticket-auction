package com.TicketTime.TicketTime.model.EventfulAPI;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Detail {
//    Event Eventful ID
    String id;
//    Venue Eventful ID
    String venue_id;

//    event title
    String title;
//    event description
    String description;
//    event start
    String start_time;

//    venue title
    String venue_name;
//    address1
    String venue_address;
//    venue city name
    String city_name;
//venue city state
    String region_abbr;
//    zip code
    String postal_code;


//    venue lat and lng
    String latitude;
    String longitude;

//    0 or 1
    String all_day;

    public Detail() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVenue_id() {
        return venue_id;
    }

    public void setVenue_id(String venue_id) {
        this.venue_id = venue_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getVenue_name() {
        return venue_name;
    }

    public void setVenue_name(String venue_name) {
        this.venue_name = venue_name;
    }

    public String getVenue_address() {
        return venue_address;
    }

    public void setVenue_address(String venue_address) {
        this.venue_address = venue_address;
    }

    public String getCity_name() {
        return city_name;
    }

    public void setCity_name(String city_name) {
        this.city_name = city_name;
    }

    public String getRegion_abbr() {
        return region_abbr;
    }

    public void setRegion_abbr(String region_abbr) {
        this.region_abbr = region_abbr;
    }

    public String getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getAll_day() {
        return all_day;
    }

    public void setAll_day(String all_day) {
        this.all_day = all_day;
    }

    @Override
    public String toString() {
        return "Detail{" +
                "id='" + id + '\'' +
                ", venue_id='" + venue_id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", start_time='" + start_time + '\'' +
                ", venue_name='" + venue_name + '\'' +
                ", venue_address='" + venue_address + '\'' +
                ", city_name='" + city_name + '\'' +
                ", region_abbr='" + region_abbr + '\'' +
                ", postal_code='" + postal_code + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", all_day='" + all_day + '\'' +
                '}';
    }
}
