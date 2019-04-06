# Your Daily Wheaties
  An application that utilizes HTML, CSS, Bootstrap, Javascript, jQuery, APIs, AJAX class, and firebase.
# Objective
  A user creates or logs-in with the firebase built in UI to their personal account. The user then inputs information about their name, city and interests via a form to create a daily personalized application. This application shows an inspirational quote, a daily joke, personalized weather and a list of events for the day in the users area.
# How it works
  Each user is given a personal key id which is used to save the users form data into an object underneath of their personal id key. Information is collected upon submit on the user information form and is set into variables and saved into firebase database. Those variables are used to make 2 different ajax calls. An inspirational quote api and joke of the day api is instanely populated without user input. Once user input is fed through the weather and eventbrite api those fields are populated with current weather in the users area, and an event table is populate with events based on the users area. The event list shows location, time, cost, and a link to the eventbrite website.
  
# Future fixes
* Make the checkbox here to by-pass refilling this form working so that the user does not have to submit a new form upon entry every time. 
* Hide the form upon submitting
* Pull variables saved in the database and place into the api ajax calls so that the users page is populated without a form when they log-in.

# Demo 
![Screenshot (14)](https://user-images.githubusercontent.com/46547100/55671949-54d89f00-5863-11e9-8247-d8f7e9f43ddf.png)
![Screenshot (15)](https://user-images.githubusercontent.com/46547100/55671950-54d89f00-5863-11e9-922f-962953bbf9d3.png)
![Screenshot (16)](https://user-images.githubusercontent.com/46547100/55671951-54d89f00-5863-11e9-81cd-c525581ef3f2.png)
![Screenshot (17)](https://user-images.githubusercontent.com/46547100/55671952-54d89f00-5863-11e9-8a90-7631c83345cf.png)
