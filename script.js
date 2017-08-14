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
      });
        $("#movieInput").val("");
    });

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