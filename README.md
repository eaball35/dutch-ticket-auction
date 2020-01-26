<p align="center"> 
     <img src="https://live.staticflickr.com/65535/49431678272_11fda6a894_w.jpg"
          alt="TicketClock Logo"/>
</p>

<a href="http://ticketclock.com" target="_blank">TicketClock.com</a> is a web-based ticket auction app which allows sellers to list tickets at whatever price and that price will reduce until a buyer is found OR the time of the event. This model is also know as a 'dutch' or 'time-based' auction. 

The project, created entirely by Emily Ball, was developed for her Ada Developers Academy Capstone project. For additional information or questions, please reach out directly to Emily at eaball35@gmail.com.

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

## Technologies
Backend
 * Lanuage - Java
 * Framework - Spring Boot
 * Database - MongoDB

Frontend
* Languages - HTML/css/JavaSript
* Framework - React JS
* Library - Bootstrap

External APIs
* [Eventful.com api](https://api.eventful.com/) - Seed Databse with Events/Venues/Performers
* [Google Maps api](https://developers.google.com/maps/documentation) - Frontend Map Components
* [Google Geocoding api](https://developers.google.com/maps/documentation/geocoding/start) - Location to Lat/Lng

Deployment
* MongoDB Atlas - Database
* AWS Elastic Beanstalk + EC2 - Backend API
* AWS S3 - Frontend Site
* AWS Route 53 - Domain

## Wireframes/Diagrams
###### Original Wireframes using [Figma.com](https://www.figma.com)
<p align="center"> 
     <img src="https://live.staticflickr.com/65535/49445828106_8c8dc2f842_z.jpg"
          alt="TicketClock wireframe headers"
          style="max-width:20%"/>
     <img src="https://live.staticflickr.com/65535/49445349983_45054c51cb_c.jpg"
          alt="TicketClock wireframe ticket"
          style="max-width:20%"/>/>
     <img src="https://live.staticflickr.com/65535/49445828051_40dfd0bf5c_c.jpg"
          alt="TicketClock wireframe new ticket"
          style="max-width:20%"/>/>
     <img src="https://live.staticflickr.com/65535/49445828026_930fc5d467_c.jpg"
          alt="TicketClock wireframe myaccount"
          style="max-width:20%"/>/>
</p>




 
 
 
 



