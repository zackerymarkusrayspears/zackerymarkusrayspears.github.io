(function(){
    //Submit Button event Handler
    $("#submit").click(function(){
        //Get the value  the user has entered in the search bar and store it
        const searchLocation = $("#searchBar").val();
        //Call the geocode function and pass in the value
        geoCode(searchLocation);
        //Clear out the search bar 
        $("#searchBar").val("");
    });

    // Allows the user to search info by Click the Enter Button
    $("#searchBar").keydown(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault(); //Stops the key from doing it's default behavior

            const searchLocation = $("#searchBar").val();
            // Call the geocode function and pass in the value
            geoCode(searchLocation);
            // Clear out the search bar 
            $("#searchBar").val("");
        }    
    });

    //When a button is clicked with the ID of remove in the document, call the function
    $(document).on("click", "button#remove", function(){
        //Get the parent element of the button
        let parentDiv = $(this).parent(); //this refers to the element that triggered the event handler (in this case the button that was clicked)
        //Get the parent of the div containing the button
        let weatherCardContainer = parentDiv.parent();
        //Remove the container and all of it's contents
        weatherCardContainer.remove();
    });
})();

//Function to connect to the Dark Sky API and get weather data 
function getWeatherInfo(latitude, longitude, city, state) {
    //https://api.darksky.net/forecast/96fe91ebc48b78588708f02067be3361/37.8267,-122.4233
    //Base-URL/APIKey/Latitude,Logitude

    $.ajax("https://api.darksky.net/forecast/"+ darkSkyKey + "/" + latitude + "," + longitude, {dataType: "jsonp" })
    .done(function(data) {
        //Get the HTML for mthe div with the ID template
        let templateHTML = $("#template").html();

        //We need to get the tempature from the Dark Sky data 
        let temperature = data.currently.temperature;
        let conditions = data.currently.summary;

        let currentDayInfo = data.daily.data[0];
        let highTemp = currentDayInfo.temperatureHigh;
        let lowTemp = currentDayInfo.temperatureLow;
        let precipChance =currentDayInfo.precipProbability * 100;

        //Replacing the string "@@city@@" with the city we pass into this function in the HTML
        templateHTML = templateHTML.replace("@@city@@", city);
        //Replace the string "@@currentTemp@@" get back from the API call
        templateHTML = templateHTML.replace("@@currentTemp@@", Math.round(temperature));
        //Replace the string "@@cityState@@" with city and state user calls
        templateHTML = templateHTML.replace("@@cityState@@", city + " " + state);
        //Replace the string "@@condition@@" for the area called
        templateHTML = templateHTML.replace("@@conditions@@", conditions);
        //Replace the string "@@highTemp@@" with the daily high temperature called
        templateHTML = templateHTML.replace("@@highTemp@@", Math.round (highTemp));
        //Replace the string "@@lowTemp@@" with the daily low temperature called
        templateHTML = templateHTML.replace("@@lowTemp@@", Math.round (lowTemp));
        //Replce the string "@@precipitation@@ with the area user calls"
        templateHTML = templateHTML.replace("@@precipitation@@",Math.round(precipChance));

     

        //Add the confiqured template HTML to our row in the card container
        $(".row").append(templateHTML);

    })
    .fail(function(error){
        console.log(error);
    })
    .always(function(){
        console.log("Weather call complete!");
    })
}

//Function to connect to the Mapquest Geocoding API and get geocoding data
function geoCode(location) {
    //Base-URL + APIKey + &location= + Address
    $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + location)
    .done(function(data) {
        
        //Get the lat and lng from the response
        let locations = data.results[0].locations[0];

        let lat = locations.latLng.lat;
        let lng = locations.latLng.lng;

        let city = locations.adminArea5;
        let state = locations.adminArea3;

        // Pass the lat and lng to our getWeatherInfo
        getWeatherInfo(lat, lng, city, state);
    })

    .fail(function(error) {
        console.log(error);
    })
    .always(function(){
        console.log("Geocoding call finished");
    })
}