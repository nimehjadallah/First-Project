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
// $(document).ready(function(){
//     $(".mainSection").hide();


//     $("#submit").on("click", function (){
//         $("#form").hide();
//         $(".mainSection").show();
       
        
    
        
//         console.log("hello");


//     });






// });


