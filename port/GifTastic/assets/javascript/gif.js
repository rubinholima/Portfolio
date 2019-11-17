$(document).ready(function () {
    // Array Topics  - With the Initial Places 
    let topics = ['Brazil', 'United States', 'New York', 'India', 'Japan', 'Boston', 'Indonesia', 'Chile', 'Spain', 'France', 'China', 'Greece', 'Poland', 'United Kingdom', 'Canada', 'Italy', 'Germany', 'Mexico']

    // Loop for create the buttons
    for (let i = 0; i < topics.length; i++) {
        let button = $('<button>');
        button.text(topics[i]);
        button.attr('data-id', i);
        button.attr('class', 'btn btn-info')
        $('#buttons').append(button);

    }
    // Listeners that get the info from location and uses the api for gifstatic
    $('#buttons').on('click', 'button', function () {
        let index = $(this).attr("data-id");
        let selectTopics = topics[index];
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectTopics + "&api_key=0kcgomywW7Ixdtr9eevRb3PVLSm2DEvF&limit=12";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                if (response.data.length === 0) {
                    $("#imagCount").empty()
                        .html('<h1>Sorry no results found! try another Locality.</h1>')
                        .addClass('text-center')
                } else {
                    $("#imagCount").empty(); // clear the <div> imagCount
                    console.log(response);
                    let results = response.data;

                    for (let i = 0; i < results.length; i++) {
                        // Loop the create the gif view and the initials variables
                        let gifUrl = results[i].images.fixed_height.url;
                        let gifUrlStill = results[i].images.fixed_height_still.url;
                        let rating = results[i].rating;
                        let divRating = $("<div id = 'rating'>").text("Rating: " + rating);
                        let gifDiv = $("<div class = 'side-side'>");
                        let gifThumb = $("<img class='img-thumbnail'>")
                            .attr("src", gifUrlStill)
                            .attr('data-still', gifUrlStill)
                            .attr('data-moving', gifUrl);

                        gifDiv.append(divRating); // appending the Ratings
                        gifDiv.append(gifThumb); // appendind to gifDiv the infos that will create the gifs views

                        $("#imagCount").prepend(gifDiv); // pre append the new gif on the top of the view

                    }
                }
            });
    });

    // listener that change tha state of still and moving    
    $('#imagCount').on('click', 'img', function () {
        let movingGif = $(this).attr('data-moving');
        let stillGif = $(this).attr('data-still');

        let state = $(this).attr('src');
        if (state === movingGif) {
            $(this).attr('src', stillGif)
        } else {
            $(this).attr('src', movingGif);
        }
    });

    // listener that get the info on the text input, append to the array and create a new button  
    $('#add-local').on('click submit', function () {

        event.preventDefault();

        $("#buttons").empty();

        let valSub = $('#add-topics').val().trim();

        if (topics.indexOf(valSub) === -1) {
            topics.push(valSub)
            $("#add-topics").val('');
        } else {
            $("#add-topics").val('')
                .attr('placeholder', 'Name exists try another!')
        }

        // rebuild the array
        for (let i = 0; i < topics.length; i++) {

            button = $('<button>');
            button.text(topics[i]);
            button.attr('data-id', i);
            button.attr('class', 'btn btn-info')
            $('#buttons').append(button);
        }



    });

});