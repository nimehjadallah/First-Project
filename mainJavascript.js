$(document).ready(function(){
    $(".mainContainer").hide();
    $("#personalizedMessage").hide();
    $(".header").show();
    $("#form").show();

    $("#submit").on("click", function (){
        event.preventDefault();

        $(".header").show();
        $("#personalizedMessage").show();
        $("#form").hide();
        $(".mainContainer").show();
    
        
        // console.log("hello");

    });

});
