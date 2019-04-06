$(document).ready(function(){
  var firebase = app_fireBase;
  var i = 0;
  var jokesArray = [];
  var userName;
  var userInterest = "";
  var city;
  var state = "-virginia";
  var country = "us";
  var mileRadius = 10;
  var price = "free";
  var date = "today";
  var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // user is signed in
      this.userId = user.uid; // calling current user and saving key

      //creates/updates the user in the database using info from authorization
      firebase
        .database()
        .ref("users/" + this.userId)
        .update({
          email: user.email
        });
    } else {
      console.log("no user yet");
    }

    var userSnap = firebase.database().ref("users/" + userId);
    userSnap.on("value", function(snap) {
     // console.log(snap.val());
      //console.log(snap.val().userName);
    });
  });

  var checked = localStorage.getItem('check');
  if (checked == "true" + userName) {
    $("#form").hide();
  }

  $("#submit").on("click", function() {
    event.preventDefault();

    if (document.getElementById("check").checked) {
      localStorage.setItem('check', JSON.stringify(true) + $("#nameInput").val());
    }
    else {
      localStorage.setItem('check', JSON.stringify(false) + $("#nameInput").val());
    }

    userName = $("#nameInput").val();
    //console.log(userName);
    city = $("#city").val().trim().toLowerCase();
    //console.log(city);
    
    var userInterest = [];
    $.each($("input[name='interest']:checked"), function() {
      userInterest.push($(this).val());
    });
    console.log("User Interest: " + userInterest.join(", "));
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

    var uid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("users/" + uid)
      .update({
        userName: userName,
        city: city,
        userInterest: userInterest
      });

    //window.location.replace("index.html"); This moves to different page
    getEvent(userInterest, city, state, mileRadius, price, date);

    getJoke();

    getQuote();

    getWeather(city, country);

  });


  $("#getTomorrowData").on("click", function () {
    var tableData = $("#event>tbody");
    tableData.empty();
    getEvent(userInterest, city, state, mileRadius, price, "tomorrow");
  });

  function getEvent(userInterest, city, state, mileRadius, price, date) {
    if(city == "richmond") {
        var queryURLEvents = "https://www.eventbriteapi.com/v3/events/search/?q=" + userInterest + "&location.address=" + city + state + "&location.within=" + mileRadius + "mi" + "&price=" + price + "&start_date.keyword=" + date + "&token=S25ZGI2VFEV2V6GIKGSW";
    } else {
    var queryURLEvents = "https://www.eventbriteapi.com/v3/events/search/?q=" + userInterest + "&location.address=" + city + "&location.within=" + mileRadius + "mi" + "&price=" + price + "&start_date.keyword=" + date + "&token=S25ZGI2VFEV2V6GIKGSW";
    };
    $.ajax({
        url: queryURLEvents,
        method: "GET"
    }).then(function(response) {
        var events = response.events;

        for(i = 0; i < events.length; i++) {
            var eventName = events[i].name.text;
            var eventURL = events[i].url;
            var eventTime = events[i].start.local;
            var startTime = eventTime.slice(11, 16);
            var startHour = startTime.slice(0, 2);
            var startMins = startTime.slice(2, 5);
            var startHourInt = parseInt(startHour);
            if(startHourInt > 12) {
                var startHourUSA = startHourInt - 12;
                var startHourString = startHourUSA.toString();
                var eventStart = startHourString + startTime.slice(2, 5) + " PM";
            } else if(startHourInt == 12) {
                var eventStart = startHour + startMins + " PM";
            } else {
                var eventStart = startHour + startMins + " AM";
            };
            
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
        printCity = (city.charAt(0).toUpperCase()) + (city.slice(1, city.length));
        if(address == null) {
            $("#event>tbody").append("<tr><td>" + eventName + "</td><td>" + printCity + "</td><td>" + eventStart + "</td><td>" + "Free" + "</td><td><a href=" + eventURL + " target='_blank'>" + eventURL + "</a></td></tr>");
        } else {
        $("#event>tbody").append("<tr><td>" + eventName + "</td><td>" + address + "</td><td>" + eventStart + "</td><td>" + "Free" + "</td><td><a href=" + eventURL + " target='_blank'>" + eventURL + "</a></td></tr>");
        }
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
        var dailyQuote = response.contents.quotes[0].quote;
        var quoteAuthor = response.contents.quotes[0].author;
        $("#quote").html('<h5>"' + dailyQuote + '"</h5><p>' + quoteAuthor + '</p>');
    });
  }

  function getWeather(city, country) {
    if(city == "richmond") {
        var cityLatLon = "lat=37.75&lon=-84.29";
        var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?" + cityLatLon + "&units=imperial&appid=" + weatherAPIKey;
    } else if(city == "washington d.c.") {
        var cityLatLon = "lat=37.13&lon=-113.51";
        var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?" + cityLatLon + "&units=imperial&appid=" + weatherAPIKey;
    } else {
    var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=imperial&appid=" + weatherAPIKey;
    };

    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function(response) {
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
