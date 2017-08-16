//Variables
var omdbSearch;
var movieDBSearch;
var radio1 = document.getElementById("actorSearch");
var radio2 = document.getElementById("keywordSearch");
var modal = document.getElementById("popUp");
var span = document.getElementsByClassName("close")[0];

//OMDB Query Function
function omdbQuery () {
  var queryURL = "https://www.omdbapi.com/?t=" + omdbSearch + "&y=&plot=short&apikey=40e9cece";

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

    //Ratings here:
    console.log(response.Ratings[0].Value);
    var leftRatingsIMBD = $("<p>").text("IMDB: " + response.Ratings[0].Value);
    movieDiv.append(leftRatingsIMBD);
    var leftRatingsRT = $("<p>").text("Rotten Tomatoes: " + response.Ratings[1].Value);
    movieDiv.append(leftRatingsRT);

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

    var compiledResultsArray = [];

    for (var i = 0; i < response.results.length; i++) {
      if (isActor(response.results[i]) && radio1.checked || isMovie(response.results[i]) && radio2.checked) {
        compiledResultsArray.push(response.results[i]);
      }
     
      if (compiledResultsArray.length == 3) {
        break;
      } 

    }

    console.log(compiledResultsArray);  

    function isActor (result) {
      return result.media_type == "person";
  
    }

    function isMovie (result) {
      return result.media_type == "movie";

    }

    if (compiledResultsArray.length  <= 0) {
      modal.style.display = "block";
      return;
    }


    if(radio1.checked){
      $("#TopResults").html("");
      $("#TopResults").append("<h2>Top Movie Results for Actor/Actress " + movieDBSearch + ":</h2>");

      for(var i = 0; i < compiledResultsArray.length; i++){
        var knownFor = compiledResultsArray[i].known_for;

        for (var j = 0; j < knownFor.length; j++) {
          var header3 = $("<h3></h3>");
          $(header3).html(knownFor[j].title + ": " + knownFor[j].release_date);
          $(header3).addClass("headerButton");
          $(header3).attr("value", knownFor[j].title);
          $("#TopResults").append(header3);   
        }
      }

    }
    else if(radio2.checked){
      $("#TopResults").html("");
      $("#TopResults").append("<h2>Top Movie Results for keyword " + movieDBSearch + ":</h2>");

      console.log(compiledResultsArray[0].title);

      for(var i = 0; i < compiledResultsArray.length; i++){

        if(compiledResultsArray[i].title == undefined){
          var header3 = $("<h3></h3>");
          $(header3).text(compiledResultsArray[i].name + ": " + compiledResultsArray[i].release_date);
          $(header3).addClass("headerButton");
          $(header3).attr("value", compiledResultsArray[i].name);
          $("#TopResults").append(header3);
          
          $("#TopResults").append("<p>" + compiledResultsArray[i].overview + "</p>");  
        }
        else{
          var header3 = $("<h3></h3>");
          $(header3).text(compiledResultsArray[i].title + ": " + compiledResultsArray[i].release_date);
          $(header3).addClass("headerButton");
          $(header3).attr("value", compiledResultsArray[i].title);
          $("#TopResults").append(header3);

          $("#TopResults").append("<p>" + compiledResultsArray[i].overview + "</p>");
        }        

      }

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

// modal Controls

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


