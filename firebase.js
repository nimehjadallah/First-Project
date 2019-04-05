//$(document).ready(function() {
  
    var app_fireBase = {};
  
    var config = {
      apiKey: "AIzaSyAXhca23sAirMnTEGXxj9SO3UAmTqS8PmI",
      authDomain: "first-project-b1c73.firebaseapp.com",
      databaseURL: "https://first-project-b1c73.firebaseio.com",
      projectId: "first-project-b1c73",
      storageBucket: "first-project-b1c73.appspot.com",
      messagingSenderId: "1098482957772"
    };
   
    firebase.initializeApp(config);
   
    app_fireBase = firebase;
 

  //var database = firebase.database();

//   $("#submit").on("click", function(event) {
//     event.preventDefault();
//     var userName = $("#nameInput")
//       .val()
//       .trim();
//     console.log(userName);
//     var city = $("#inputCity")
//       .val()
//       .trim();
//     console.log(city);
//     var state = $("#inputState")
//       .val()
//       .trim();
//     console.log(state);

//     // var cityState = $("#areaInput").val().trim();
//     // console.log(cityState);
//     //   var month = moment($("#monthInput").val().trim(), "MM/DD/YYYY").format("X");

//     var newUser = {
//       name: userName,
//       city: city,
//       state: state
//     };
//     database.ref().push(newUser);
//   });
//   $("#nameInput").val("");
//   $("#inputCity").val("");
//   $("#inputState").val("");

//   database.ref().on("value", function(snapshot) {
//     var userName = snapshot.val().name;
//     $("#nameInput").text(userName);

//     var city = snapshot.val().city;
//     $("#inputCity").text(city);

//     var state = snapshot.val().state;
//     $("#inputState").text(state);
//   });
//});
