$(document).ready(function(){
    $(".mainContainer").hide();
    $("#personalizedMessage").hide();
    $(".header").show();
    $("#form").show();

    var i = 0;
    var n = 0;
    var jokesArray = [];
    var userName = "";
    var userInterest = "";
    var city = "";
    var state = "virginia";
    //var zip = "";
    var country = "us"
    var mileRadius = 10;
    var price = "free";
    var date = "today"
    var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

    $("#submit").on("click", function (){
        event.preventDefault();

        $(".header").show();
        $("#personalizedMessage").show();
        $("#form").hide();
        $(".mainContainer").show();

        userName = $("#nameInput").val().trim();
        console.log(userName);
        city = $("#city").val().trim().toLowerCase();
        console.log(city);
        //state = $("#inputState").val().trim().toLowerCase();
        //console.log(state);
        //zip = $("#inputZip").val().trim();
        //console.log(zip);
        $("#userName").append(userName);

        var userInterest = [];
            $.each($("input[name='interest']:checked"), function(){            
                userInterest.push($(this).val());
            });
            console.log("My hobbies are: " + userInterest.join(", "));
            console.log(userInterest);
            if (userInterest[0] == "music") {
                userInterest = "music";
            } else if (userInterest[0] == "film") {
                userInterest = "film";
            } else if (userInterest[0] == "sports") {
                userInterest = "sports";
            } else if (userInterest[0] == "outdoor") {
                userInterest = "outdoor";
            } else if (userInterest[0] == "food") {
                userInterest = "food";
            } else if (userInterest[0] == "charity") {
                userInterest = "charity";
            } else {
                userInterest = "";
            }

            console.log(userInterest);

        getEvent(userInterest, city, state, mileRadius, price, date);

        getJoke();

        getQuote();

        getWeather(city, country);

    });

    $("#getTomorrowData").on("click", function () {
        getEvent(userInterest, city, state, mileRadius, price, "tomorrow");
    });

    function getEvent(userInterest, city, state, mileRadius, price, date) {
        var queryURLEvents = "https://www.eventbriteapi.com/v3/events/search/?q=" + userInterest + "&location.address=" + city + "-" + state + "&location.within=" + mileRadius + "mi" + "&price=" + price + "&start_date.keyword=" + date + "&token=S25ZGI2VFEV2V6GIKGSW";
        $.ajax({
            url: queryURLEvents,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var events = response.events;

            for(i = 0; i < events.length; i++, n++) {
                var eventName = events[i].name.text;
                var eventURL = events[i].url;
                var eventTime = events[i].start.local;
                var eventStart = eventTime.slice(11, 16);
                var venueID = events[i].venue_id;
                
                getLocation(venueID, eventName, eventStart, eventURL);                
            };
        });
    }

    function getLocation(venueID, eventName, eventStart, eventURL) {
        var queryURLEventLocation = "https://www.eventbriteapi.com/v3/venues/" + venueID + "/?token=S25ZGI2VFEV2V6GIKGSW";

        $.ajax({
            url: queryURLEventLocation,
            method: "GET"
        }).then(function(response) {
            var address = response.address.address_1;
            $("#event>tbody").append("<tr><td>" + eventName + "</td><td>" + address + "</td><td>" + eventStart + "</td><td>" + "Free" + "</td><td><a href=" + eventURL + " target='_blank'>" + eventURL + "</a></td></tr>");
        });
    }

    function getJoke() {
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
            var dailyJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
            $("#joke").html(dailyJoke);
        });
    }

    function getQuote() {
        var queryURLQuote = "http://quotes.rest/qod.json";
        $.ajax({
            url: queryURLQuote,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var dailyQuote = response.contents.quotes[0].quote;
            var quoteAuthor = response.contents.quotes[0].author;
            $("#quote").html("<h5>" + dailyQuote + "</h5><p>" + quoteAuthor + "</p>");
        });
    }
    
    function getWeather(city, country) {
        var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=imperial&appid=" + weatherAPIKey;

        $.ajax({
            url: queryURLWeather,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var degrees = Math.floor(response.main.temp);
            var description = response.weather[0].description;
            var location = response.name;
            var iconCode = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            $("#icon").html("<img src='" + iconURL  + "'>");
            //$(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Weather Icon'>");
            $("#degrees").html(degrees + " &deg");
            $("#precipitation").html("Forecast: " + description);
            $("#location").html(location);
        });
    }
});