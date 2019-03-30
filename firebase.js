$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyAXhca23sAirMnTEGXxj9SO3UAmTqS8PmI",
        authDomain: "first-project-b1c73.firebaseapp.com",
        databaseURL: "https://first-project-b1c73.firebaseio.com",
        projectId: "first-project-b1c73",
        storageBucket: "first-project-b1c73.appspot.com",
        messagingSenderId: "1098482957772"
    };
      firebase.initializeApp(config);

      
     
      var database = firebase.database();

      $("#submit").on("click", function(event){
        event.preventDefault();
        var userName = $("#userName").val().trim();
        console.log(userName);
        var cityState = $("#areaInput").val().trim();
        console.log(cityState);
    //   var month = moment($("#monthInput").val().trim(), "MM/DD/YYYY").format("X");
    
    var newUser = {
        name: userName,
        cityState: cityState,
         
    };
     database.ref().push(newUser);
    });

      
    database.ref().on("value", function(snapshot){
        var name = snapshot.val().name;
        $("#userName").text(name);

        var citystate = snapshot.val().cityState;
        $("#areaInput").text(citystate);
    });


});






// //   var name="";
    // //   var cityState="";
    // //   var month="";

    //   $(".form-field").on("keyup", function(){
    //       var userName = $("#name").val().trim();
    //       var cityState = $("#areaInput").val().trim();
    //       var month = $("#monthInput").val().trim();

    //       sessionStorage.setItem("userName", userName);
    //       sessionStorage.setItem("City/State", cityState);
    //       sessionStorage.setItem("month of birth", month);
    //     });

    //     $("#name").val(sessionStorage.getItem("userName"));
    //     $("#areaInput").val(sessionStorage.getItem("City/State"));
    //     $("#monthInput").val(sessionStorage.getItem("month of birth"));

    //     $("#submit").on("click", function(event){
    //         event.preventDefault();
    //         if ($("#name").val().trim() === "" ||
    //         $("#areaInput").val().trim() === "" ||
    //         $("#monthInput").val().trim() === "" ) {

    //             alert("Please fill in the username details to continue");
    //         } else {


    //         }
    //     })