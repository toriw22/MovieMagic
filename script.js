 function movieDisplayInfo () {

       $("#button").on('click', function(event){
       	event.preventDefault();


        var movie = $("#movieInput").val();
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";



        // Creating an AJAX call for the specific movie button being clicked
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



          $("#LeftResults").append(movieDiv)


      });
        $("#movieInput").val("");
    });
   }

   movieDisplayInfo ();