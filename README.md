<p align="center"> 
     <img src="https://live.staticflickr.com/65535/49431678272_11fda6a894_w.jpg"
          alt="TicketClock Logo"/>
</p>

<a href="http://ticketclock.com" target="_blank">TicketClock.com</a> is a web-based ticket auction app which allows sellers to list tickets at whatever price and that price will reduce until a buyer is found OR the time of the event. This model is also know as a 'dutch' or 'time-based' auction. 

The project, created entirely by Emily Ball, was developed for her Ada Developers Academy Capstone project. For additional information or questions, please reach out directly to Emily at eaball35@gmail.com.

## Table of Contents
* [Demo](#demo)
* [Technologies](#technologies)
* [Getting Started](#getting-started)
* [About Capstone](#about-capstone)
* [Product Plan](#product-plan)
* [Wireframes/Diagrams](#wireframes-and-diagrams)


## Demo
###### Search By Location
![By Location Demo](https://thumbs.gfycat.com/SpeedyDecimalBorer-size_restricted.gif)

## Technologies
Backend
 * Lanuage - [Java](https://www.oracle.com/java/)
 * Framework - [Spring Boot](https://spring.io/projects/spring-boot)
 * Database - [MongoDB](https://www.mongodb.com/)

Frontend
* Languages - HTML/css/JavaScript
* Framework - [React JS](https://reactjs.org/)
* Library - [Bootstrap](https://react-bootstrap.github.io/)
* [Google Maps Visual Component](https://www.npmjs.com/package/google-map-react)
* [US States Visual Component](https://www.npmjs.com/package/react-usa-map)

External APIs
* [Eventful.com api](https://api.eventful.com/) - Seed Databse with Events/Venues/Performers
* [Google Maps api](https://developers.google.com/maps/documentation) - Frontend Map Components
* [Google Geocoding api](https://developers.google.com/maps/documentation/geocoding/start) - Location to Lat/Lng

Deployment
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
* [AWS Elastic Beanstalk + EC2](https://aws.amazon.com/elasticbeanstalk/) - Backend API
* [AWS S3](https://aws.amazon.com/s3/) - Frontend Site
* [AWS Route 53](https://aws.amazon.com/route53/) - Domain

## Getting Started
Checkout site demo at [ticketclock.com](http://ticketclock.com) or run locally by following setup instructions below.
### Backend API Setup
###### Requirments
* [JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Maven 4.0.0](https://maven.apache.org/)
###### Install & Run
1. Fork and clone project folder name 'ticket-clock-api'
2. Set up your own [MongoDb Atlas cluster](https://cloud.mongodb.com/) and configure mongoDB 'URI' and 'database' name
3. Configure [Eventful.com API key](https://api.eventful.com/) and [Google GeoCoding API key](https://developers.google.com/maps/documentation/javascript/geocoding)
4. Configure `@CrossOrigin(origins = "http://ticketclock.com")` annotation within controller classes to allow frontend URL
5. Run Spring Boot application locally by executing the 'main' method in 'com.TicketTime.TicketTime.TicketTimeApplication'
###### Security
```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

Spring Boot Starter Security default username is user and a generated security password is printed in the console like 'generated security password: 0123abc4-5678-9ef0-1g2h-i3456jklmno7'

### Front End Site Setup
###### Requirments
* [Node - npm](https://www.npmjs.com/get-npm)
###### Install & Run
1. Fork and clone project folder named 'ticket-clock-api'
2. Install dependencies with `npm install`
3. Configure Spring security username, password, and backend API base URL
4. Configure Google Maps API security key
4. Start server locally with `npm start`

## About Capstone
Capstone is the largest undertaking while at Ada Developers Academy. Given roughly 3 weeks, students take on roles of both the product owner and developer for their own full stack concepts. It is up to students to decide what and how things get built, given the added challenge of incorporating at least 3 new learned technologies. Projects are demoed at the end of captsone during a science fair style celebration. For additional information on Ada Capstone, vist Ada's project repo [here](https://github.com/Ada-C12/capstone).

#### Ada Capstone Learning Goals
 * Demonstrate self-direction, time management, and independent learning
 * Learn and implement new technologies
 * Complete a product lifecycle from conception to delivery
 * Utilize agile practices learned to assist in project completion
 
 #### Emily's Added Capstone Learning Goals
 * Exposure to statically typed language
 * Exposure to non-relational database
 * Exposure to deploying with cloud services such as AWS
 * Additional practice working with API integrations
 
## Product Plan
###### Problem Statement
Often I see resale tickets going for ridiculously high prices just hours before the show only to never be purchased. This means unhappy fans AND loss of potential revenue for sellers. Other times, I buy tickets to a show only to find I can't go. I'd be happy to get whatever I can get for the tickets, otherwise I want to just give them away cheap to another fan.

To solve this problem, I propose developing a web-based app which allows sellers to list tickets at whatever price and that price will reduce until a buyer is found OR the time of the event.

###### Market Research
Currently, you can list tickets on sites like Ticketmaster, StubHub, or Craigslist for a certain price, without being sure you're getting the market rate, or you can use an auction-based site like Ebay. While Ebay is great, their traditional auction model doesn't always work well for the unique supply and demand of an asset like tickets which are worthless after a specific time.

###### Target Audience
My app targets concert goers and event attendenders. Both those who have extra tickets and want to get rid of them, and those who don't have tickets yet but want good deals on them.


## Wireframes and Diagrams
###### Original Wireframes using [Figma.com](https://www.figma.com)
<p align="center"> 
     <img src="https://live.staticflickr.com/65535/49445828106_8c8dc2f842_z.jpg"
          alt="TicketClock wireframe headers"
          width="350"/>
     <img src="https://live.staticflickr.com/65535/49445828026_930fc5d467_c.jpg"
          alt="TicketClock wireframe myaccount"
          width="350"/>
     <img src="https://live.staticflickr.com/65535/49445349983_45054c51cb_c.jpg"
          alt="TicketClock wireframe ticket"
          width="350"/>
     <img src="https://live.staticflickr.com/65535/49445828051_40dfd0bf5c_c.jpg"
          alt="TicketClock wireframe new ticket"
          width="350"/>
</p>

###### Entity Relationship Diagram using [lucidchart.com](https://www.lucidchart.com)
<p align="center"> 
     <img src="https://live.staticflickr.com/65535/49445828156_297606e957_b.jpg"
          alt="TicketClock ERD"
          width="600"/>
</p> 
 
 
 
 



