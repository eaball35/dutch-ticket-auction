package com.TicketTime.TicketTime.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Document
public class User {
    @Id
    private String id;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();

//    Added provider
    private AuthProvider1 provider;
    private String providerId;
    private String password;

<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
=======
//    Added provider
    private AuthProvider1 provider;
    private String providerId;
    private String password;
    private String imageURL;

>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
    @NotBlank
    private String name;
    @NotBlank
<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
    private String email;
    private final Address address;

    public User(@NotBlank String name, @NotBlank String email, Address address) {
        this.name = name;
=======
<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
    private final String email;
    private final Address address;

    public User(@NotBlank String firstName, @NotBlank String lastName, @NotBlank String email, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
=======
    private String email;
    private Address address;

    public User(@NotBlank String name, @NotBlank String email) {
        this.name = name;
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
        this.email = email;
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

    public AuthProvider1 getProvider() {
        return provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public String getPassword() {
        return password;
    }

<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
    public String getName() {
        return name;
=======
<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
    public String getLastName() {
        return lastName;
=======
    public String getImageURL() {
        return imageURL;
    }

    public String getName() {
        return name;
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
    }

    public String getEmail() {
        return email;
    }

    public Address getAddress() {
        return address;
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

    public void setProvider(AuthProvider1 provider) {
        this.provider = provider;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
=======
<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
=======
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
    public void setPassword(String password) {
        this.password = password;
    }

<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
=======
    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }
<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
=======
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
                ", provider=" + provider +
                ", providerId='" + providerId + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
=======
<<<<<<< Updated upstream:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
                ", providerId=" + providerId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
=======
                ", provider=" + provider +
                ", providerId='" + providerId + '\'' +
                ", password='" + password + '\'' +
                ", imageURL='" + imageURL + '\'' +
                ", name='" + name + '\'' +
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/model/User.java
>>>>>>> Stashed changes:Ticket-Time/src/main/java/com/TicketTime/TicketTime/user/User.java
                ", email='" + email + '\'' +
                ", address=" + address +
                '}';
    }
}


