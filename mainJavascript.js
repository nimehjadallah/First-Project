$(document).ready(function(){
    $(".mainContainer").hide();
    $("#personalizedMessage").hide();
    $(".header").show();
    $("#form").show();

    var i = 0;
    var jokesArray = [];
    var dailyJoke = "";
    var userName = "";
    var userInterest = "";
    var city = "";
    var state = "";
    var zip = "";
    var country = "us"
    var mileRadius = 10;
    var price = "free";
    var date = "today"
    var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

<<<<<<< HEAD
=======
    $("#submit").on("click", function (){
        event.preventDefault();

>>>>>>> b344258870fcb83f049167570697a8807fef7530
        $(".header").show();
        $("#personalizedMessage").show();
        $("#form").hide();
        $(".mainContainer").show();
<<<<<<< HEAD
    
        
        // console.log("hello");

    });

});
=======

        userName = $("#nameInput").val().trim();
        console.log(userName);
        city = $("#inputCity").val().trim().toLowerCase();
        console.log(city);
        state = $("#inputState").val().trim().toLowerCase();
        console.log(state);
        zip = $("#inputZip").val().trim();
        console.log(zip);

        /*
        var music = document.form.interests.music.value;
        var filmMedia = document.form.interests.film-media.value;
        var sportsFitness = document.form.interests.sports-fitness.value;
        var travelOutdoor = document.form.interests.travel-outdoor.value;
        var foodDrink = document.form.interests.food-drink.value;
        var charityCauses = document.form.interests.charity-causes.value;

        if (music == "music") {
            userInterest += "music";
        }
        if (filmMedia == "film") {
            userInterest += "film";
        }	
        if (sportsFitness == "sports") {
            userInterest += "sports";
        }
        if (travelOutdoor == "outdoor") {
            userInterest += "outdoor";
        }
        if (foodDrink == "food") {
            userInterest += "food";
        }
        if (charityCauses == "charity") {
            userInterest += "charity";
        }

        console.log(userInterest);
        */

        var queryURLEvents = "https://www.eventbriteapi.com/v3/events/search/?q=" + userInterest + "&location.address=" + city + "-" + state + "&location.within=" + mileRadius + "mi" + "&price=" + price + "&start_date.keyword=" + date + "&token=S25ZGI2VFEV2V6GIKGSW";
        $.ajax({
            url: queryURLEvents,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var events = response.events;
            for(i = 0; i < events.length; i++) {
            var eventName = events[i].name.text;
            var eventURL = events[i].url;
            var eventTime = events[i].start.local;
            var eventStart = eventTime.slice(11, 16);
            $("#event>tbody").append("<tr><td>" + eventName + "</td><td>" + "Richmond, VA" + "</td><td>" + eventStart + "</td><td>" + "Free" + "</td><td>" + eventURL + "</td></tr>");
            }
        });

        var queryURLJoke = "https://icanhazdadjoke.com/search"
        $.ajax({
            headers: { 
            Accept : "application/json"
        },
            url: queryURLJoke,
            method: "GET"
        }).then(function(response) {
            var jokes = response.results;
            for (var i = 0; i < jokes.length; i++) {
            jokesArray.push(response.results[i].joke);
        }
            dailyJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
            console.log("Daily Joke: " + dailyJoke);
            $("#joke").html(dailyJoke);
        });

        var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=imperial&appid=" + weatherAPIKey;

        $.ajax({
            url: queryURLWeather,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var degrees = Math.floor(response.main.temp);
            console.log("Temperature: " + degrees);
            var description = response.weather[0].description;
            console.log("Forecast: " + description);
            var location = response.name;
            console.log("Location: " + location);
            $("#degrees").html(degrees + " &deg");
            $("#precipitation").html("Forecast: " + description);
            $("#location").html(location);
        });
 
 
        // console.log("hello");
 

    });
 
 });
>>>>>>> b344258870fcb83f049167570697a8807fef7530
