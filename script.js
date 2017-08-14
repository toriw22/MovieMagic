//Variables
var omdbSearch;
var movieDBSearch;
var radio1 = document.getElementById("movieSearch");
var radio2 = document.getElementById("actorSearch");
var radio3 = document.getElementById("keywordSearch");

//OMDB Query Function
function omdbQuery () {
  var queryURL = "http://www.omdbapi.com/?t=" + omdbSearch + "&y=&plot=short&apikey=40e9cece";

  $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    console.log(response);

    var movieDiv = $("<div>");

    // Release Date here:
    console.log(response.Released);
    var leftRelease = $("<p>").text("Released: " + response.Released);
    movieDiv.append(leftRelease);

    // Plot here:
    console.log(response.Plot);
    var leftPlot = $("<p>").text("Plot: " + response.Plot);
    movieDiv.append(leftPlot);

    // Actors here:
    console.log(response.Actors);
    var leftActors = $("<p>").text("Actors: " + response.Actors);
    movieDiv.append(leftActors);

    // Poster here:
    console.log(response.Poster);
    var leftPoster = $("<img>").attr('src', response.Poster);
    movieDiv.append(leftPoster);

    // Rating here:
    console.log(response.Rated);
    var leftRated = $("<p>").text("Rated: " + response.Rated);
    movieDiv.append(leftRated);

    $("#LeftResults").html("");
    $("#LeftResults").append(movieDiv);
  })
}

//Movie Database Query Function
function movieDBQuery (){
  var apiKey = "15db597c6b1aa16dcb2b2844cefc6468";
  var queryURL = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + movieDBSearch + "&page=1&include_adult=false";

  console.log(movieDBSearch);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    console.log(response);

    var result = response.results[0];
    console.log(result);

    if(radio1.checked){
      $("#TopResults").html("");
      $("#TopResults").append("<h2>Movie Result:</h2>");

    
      if(result.title == undefined){
        $("#TopResults").append("<h3>" + result.name + ": " + result.release_date + "</h3>");
        $("#headerButton").attr("value", result.name);
        $("#TopResults").append("<p>" + result.overview + "</p>"); 
      }
      else{
        $("#TopResults").append("<h3>" + result.title + ": " + result.release_date + "</h3>");
        $("#headerButton").attr("value", result.title);
        $("#TopResults").append("<p>" + result.overview + "</p>");
      }  
    }
    else if(radio2.checked){
      $("#TopResults").html("");
      $("#TopResults").append("<h2>Top Movie Results for Actor/Actress " + movieDBSearch + ":</h2>");

      for(var i = 0; i <= 2; i++){
        
        var header3 = $("<h3></h3>");

        $(header3).text(result.known_for[i].title + ": " + result.known_for[i].release_date);
        $(header3).addClass("headerButton");
        $(header3).attr("value", result.known_for[i].title);
        $("#TopResults").append(header3);      

      }
    }
    else if(radio3.checked){
      $("#TopResults").html("");
      $("#TopResults").append("<h2>Top Movie Results for keyword " + movieDBSearch + ":</h2>");

      for(var i = 0; i <= 2; i++){

        if(response.results[i].title == undefined){
          var header3 = $("<h3></h3>");
          $(header3).text(response.results[i].name + ": " + response.results[i].release_date);
          $(header3).addClass("headerButton");
          $(header3).attr("value", response.results[i].name);
          $("#TopResults").append(header3);
          
          $("#TopResults").append("<p>" + response.results[i].overview + "</p>");  
        }
        else{
          var header3 = $("<h3></h3>");
          $(header3).text(response.results[i].title + ": " + response.results[i].release_date);
          $(header3).addClass("headerButton");
          $(header3).attr("value", response.results[i].title);
          $("#TopResults").append(header3);

          $("#TopResults").append("<p>" + response.results[i].overview + "</p>");
        }

      }

    }
    else{
      console.log("No radio button clicked");
    }

    $(".headerButton").on("click", function(){
      event.preventDefault();
      var tempVar = this;
      console.log(tempVar);

      omdbSearch = $(tempVar).attr("value");
      console.log(omdbSearch);
      omdbQuery();
    })  

  })

}


//Search Button onClick
$("#button").on("click", function(){
  event.preventDefault();
  if(radio1.checked){
    console.log("Radio1 button checked");
    omdbSearch = $("#movieInput").val().trim();
    movieDBSearch = omdbSearch;
    omdbQuery();
    movieDBQuery();
  }
  else{
    $("#LeftResults").html("");
    console.log("Radio1 button not checked");

    movieDBSearch = $("#movieInput").val().trim();
    movieDBQuery();
  }
})



// Animation here:
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

       
   $(".navbar-brand").hover(function () {

     $(this).removeClass("bounce").addClass("fadeIn").one(animationEnd, function() {
            $(this).removeClass("fadeIn");
            return this;
          });
    });


   $("h3").hover(function () {
      $(this).addClass("animated").addClass("shake").one(animationEnd, function() {
            $(this).removeClass("shake");
            return this;
      });


   });

// Footer Update move to bottom
  $(".btn").on("click", function() {
      $(".footer").removeClass("footer").addClass("footerUpdate");

  });

