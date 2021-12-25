# Cactus Airlines
<div id="top"></div>


[![Contributors][contributors-shield]][contributors-url]




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Seif25/Cactus">
    <img src="client/src/logo4.png" alt="Logo" width="200" height="150">
  </a>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <a href="https://github.com/Seif25/Cactus">
    <img src="https://github.com/advanced-computer-lab/Cactus/blob/866c1e61bfd1be510949de72280898f91b9bac0b/Cactus%20Airlines%20-%20Google%20Chrome%2025_12_2021%2011_45_29%20AM.png" alt="Homepage">
  </a>
</div>
Our Project is based on Creating an Airplane Reservation System "Cactus Airlines" .This System is a web application through which individuals can reserve for them and their families and pay for flights in order to travel to different countries and/or domestic Cities.
Also, Individuals are able to change/cancel flights according to their needs and schedule.
In this project we have implemented the Agile Methodology with Sprints lasting about 2-3 weeks.


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [MongoDB](https://mongodb.com)
* [Express](https://expressjs.com)
* [React.js](https://reactjs.org/)
* [NodeJS](https://nodejs.com)
* [Material UI](https://mui.com)
* [Stripe](https://stripe.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To start contributing in this repo you will first have to clone the repo and npm install a few things.

## Motivation

We have decided to create this project for numerous reasons.
Firstly, implementing what we have learned in terms of languages and Technologies on a real life Application, that gave us the opportunity to discover different Flight Companies' Websites and add our input as well as create something of our own.
The Competition in the Market was for sure very competitive thus creating something Unique was a must to ensure our survival and Market Presence.
The Reason we have come up with this idea is that we felt that most of the available websites in the market don't satisfy all the needs of the Customers interms of (Prices,Flight Availability,comfortability ..etc )and there is a gap that we decided to Fill. Thats where we decided to step in !!.

## Build Status
Till now there aren't any reported issues from our Customers.However, We appreciate your opinion and any improvements you suggest on cactusairlines@gmail.com

## Code Style 
Our Coding Style was one of the Key Factors that made this project possible. We have used a Convention that we all agreed on to make the project scalable in the future 
* Egyptian Style Curly Braces
* Small Line Length
* Indentation when inside a block to be able to differentiate the Code(Nesting Levels)
* CamelCase in Naming Functions and Variables
* Exception Handling Convention(Error Return Values)

## ScreenShots
<div align="center">
   <a href="https://github.com/Seif25/Cactus">
      <img src="https://github.com/advanced-computer-lab/Cactus/blob/249c96513c768e357c29610fd87677daf14f9306/IMG-20211225-WA0030.jpg" alt="book">
   </a>
   <a href="https://github.com/Seif25/Cactus">
    <img src="https://github.com/advanced-computer-lab/Cactus/blob/249c96513c768e357c29610fd87677daf14f9306/IMG-20211225-WA0029.jpg" alt="seats">
  </a>
  <a href="https://github.com/Seif25/Cactus">
    <img src="https://github.com/advanced-computer-lab/Cactus/blob/249c96513c768e357c29610fd87677daf14f9306/IMG-20211225-WA0034.jpg" alt="summary">
  </a>
  <a href="https://github.com/Seif25/Cactus">
    <img src="https://github.com/advanced-computer-lab/Cactus/blob/249c96513c768e357c29610fd87677daf14f9306/IMG-20211225-WA0037.jpg" alt="summary">
  </a>
  <a href="https://github.com/Seif25/Cactus">
    <img src="https://github.com/advanced-computer-lab/Cactus/blob/249c96513c768e357c29610fd87677daf14f9306/IMG-20211225-WA0028.jpg" alt="user">
  </a>
  
</div>

## Features
We are all very pleased to announce Our Cactus Airlines System that gives a whole new experience in the World of travelling. No Need to stand in line to see flights availability and compare prices like in the Past. Now you are able to do all this from your space. Also, you will be able to Pay Online So No More Queueing. Moreover, in Case of any Emergencies you will be able to reschedule the flights booked with Zero to minimum charges. So we Could Say. Welcome aboard! 

## Code Examples

<div align="center">
  <h1>Server</h1>
  <a href="https://github.com/Seif25/Cactus">
    <img src="https://github.com/advanced-computer-lab/Cactus/blob/4e7056160ce12d6c1843656eeca8826484ba19be/indexJS(server).png" alt="server" >
  </a>
  <h1>Client</h1>
   <a href="https://github.com/Seif25/Cactus">
    <img src="https://github.com/advanced-computer-lab/Cactus/blob/4e7056160ce12d6c1843656eeca8826484ba19be/appJS.png" alt="server" >
  </a>
</div>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/advanced-computer-lab/Cactus.git
   ```
2. Install Server NPM packages -> cd Cactus/Server
   ```sh
   npm install
   ```
3. Install Client NPM packages -> cd Cactus/client
    ```sh
   npm install
   ```
4. Enter your PRIVATE variables in `.env`
   ```js
   PORT=8000
   MONGOURI='mongodb+srv://example:testpassword@yourdb.gqpep.mongodb.net/YourDB?retryWrites=true&w=majority'
   STRIPE_SECRET_TEST=" sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   EMAIL_PASS='************'
   ACCESS_TOKEN_SECRET="your_secret_access_token"
   ```
5.In the Server Directory ,Type
    ```
    node index
    ```
    
    
6.In Another Terminal Window .In the Client Directory,Type
    ```
    npm start
    ```


<p align="right">(<a href="#top">back to top</a>)</p>

## API Reference
The API References that helped Us alot in this project was the Nodejs Documentation (https://nodejs.org/docs/latest-v15.x/api/), React Documentation (https://reactjs.org/docs/getting-started.html),Axios Doucmentation(https://axios-http.com/docs/intro).MaterialUI Documentation (https://mui.com/getting-started/usage/)

## Tests
We have used up-to-date Testing Techniques to ensure that quality we give to our Customers is up to their expectations.Such as Jest and Super Test (For Automated Testing) and Postman for Testing APIs 


## How to Use ?
The Website will be hosted and be made available on 1/1/2022 , with a 20% Discount on All Our Flights !!. You can start by Logging (Or SignUp ) to our website ,Choose the Your Location and Destination along with the Dates , and leave the rest on us . All Available flights will be displayed and you will be able choose the flight that you want.After that you are able to choose the Payment Method that suits you (MasterCard or Visa) . In Case you would to change any flight or any Personal Data , you will be able to do so in your Profile Page.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. and contact us on cactusairlines@gmail.com
Here are the Steps:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED ON THE SITE -->

## Credits 
This Project Wouldn't have been released without the Support and help From our beloved Doctors ( Mervat Abo El kheir , Nada Shaarawi ). Along with MaterialUI library https://mui.com/


<!-- CONTACT -->
## Contact

Project Link: [https://github.com/Seif25/Cactus](https://github.com/Seif25/Cactus)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

* [Material UI Docs](https://mui.com/getting-started/usage/)
* [Stripe Docs](https://stripe.com/docs/api)
* [React Docs](https://reactjs.org/docs/getting-started.html)
* [Stack Overflow](https://stackoverflow.com)
* [Youtube](https://youtube.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Seif25/Cactus.svg?style=for-the-badge
[contributors-url]: https://github.com/Seif25/Cactus/graphs/contributors
