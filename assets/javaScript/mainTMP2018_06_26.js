
// ###########################
// ### Initialize Firebase ###
// ###########################
var config = {
    apiKey: "AIzaSyDKFfJF_faqFCviogn94go02fmSzJcSkTA",
    authDomain: "bootcamp2018-6b307.firebaseapp.com",
    databaseURL: "https://bootcamp2018-6b307.firebaseio.com",
    projectId: "bootcamp2018-6b307",
    storageBucket: "bootcamp2018-6b307.appspot.com",
    messagingSenderId: "895105643483"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Visitors
$("#add-visitor-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var firstName = $("#first-name-input").val().trim();
  var location = $("#location-input").val().trim();

  if ((firstName != '')&&(location != '')) {
    // Creates local "temporary" object for holding Visitor data
    var newVisitor = {
      name: firstName,
      location: location,
    };

    // Uploads Visitor data to the database
    database.ref("hhjss").push(newVisitor);

    // Logs everything to console
    log('newVisitor.name: ' +newVisitor.name+ ' newVisitor.location: ' +newVisitor.location);

  
    // Clears all of the text-boxes
    $("#first-name-input").val("");
    $("#location-input").val("");
  } else {
    alert("Unable to Submit - Empty Field");
  }
});

// Firebase event for adding User to the database and a row in the html when a user adds an entry
database.ref("hhjss").limitToLast(4).on("child_added", function(childSnapshot, prevChildKey) {

  log(childSnapshot.val());

  // Store everything into a variable.
  var firstName = childSnapshot.val().name;
  var location = childSnapshot.val().location;

  // Train Info
  log('firstName: ' + firstName + ' location: ' + location);

  // Add each train's data into the table
  $("#visitor-table > tbody").append("<tr><td>" + firstName + "</td><td>" + location + "</td></tr>");
});
// ###########################
// ###  END Of Firebase    ###
// ###########################

// Get value of dropdown menu when clicked
$(".dropdown-menu").on('click', 'a', function(){
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());

    var dropdownMenu = $(this).text();
    log( " Dropdown Value: "+dropdownMenu );
    displayLocations(dropdownMenu, 'active', 10);
    displayWeather(dropdownMenu);
});
  
function displayLocations(location, term, results) {
    location = location.trim().split(' ').join('+'); // YELP API Needs plus sign seperated elements
    term = term.trim().split(' ').join('+'); // YELP API Needs plus sign seperated elements
    log('displayLocation- location: '+location+ ' term: ' +term+ ' results: ' +results);

    var currentId = $(this).attr('data-name');
    var ratingVal = '';
    ratingVal = $('#dropdownMenuButton').val().toLowerCase();
    log(currentId+" "+ratingVal);

    //var originalURL = "https://api.yelp.com/v3/businesses/search?location=boston+ma&term=burrito+sushi+noodles";
    //var originalURL = "https://api.yelp.com/v3/businesses/search?find_loc="+location+"&start=0&sortby=rating&cflt="+term;
    var originalURL = "https://api.yelp.com/v3/businesses/search?location="+location+"&sortby=rating&categories="+term;
    var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL;
    // find_loc=Denver+CO&cflt=active
    // find_loc=Denver+CO&start=0&sortby=rating&cflt=active

    $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json",
    // this headers section is necessary for CORS-anywhere
    headers: {
        "x-requested-with": "xhr",
        "Authorization": "Bearer X9n4FIgpRwzPPKGhBDdzeFrDN4-yEN2MuMI_Ly4C8YkaRD-RaT3TmvzXC6BJAvx_deD5Z16Z71BPc_0WcUUobK64I_AyCAXs7Efu_lv2bq6GTRwGZs2xRnAkp1IsW3Yx"
    }
    }).done(function(response) {
        console.log('CORS anywhere response', response);
        log(queryURL);
        log(response);

        $("#mainDisplayYelp").empty();

        // storing the data from the AJAX request in the results variable
        var results = response.businesses;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var yelpDiv = $("<div>");
            yelpDiv.addClass('txtIvory width320');

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var yelpImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            yelpImage.attr("src", results[i].image_url);
            yelpImage.attr("alt", results[i].name)
            yelpImage.attr("height", "200px");
            yelpImage.attr("data-state", "still");
            yelpImage.attr("class", "gif");


            yelpDiv.append(yelpImage);
            yelpDiv.append(p);

            $("#mainDisplayYelp").append(yelpDiv);
        }

    }).fail(function(jqXHR, textStatus) {
        console.error(textStatus)
    })

}

function displayWeather(location) {
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    location = location.trim().split(' ').join(','); // API requires comma seperated location.

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=" + APIKey;
    var htmlElements = '';

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        // Log the queryURL
        log(queryURL);
        // Log the resulting object
        log(response);
        var currentCity = response.name;
        var currentHumidity = response.main.humidity +' %';
        var currentPressure = response.main.pressure;
        var currentTempF = temperatureConverterF(response.main.temp) +' F';
        var currentTempC = temperatureConverterC(response.main.temp) +' C';
        var currentTempMaxF = temperatureConverterF(response.main.temp_max) +' F ';
        var currentTempMaxC = temperatureConverterC(response.main.temp_max) +' C ';
        var currentTempMinF = temperatureConverterF(response.main.temp_min) +' F ';
        var currentTempMinC = temperatureConverterC(response.main.temp_min) +' C ';
        var currentWindSpeed = response.wind.speed;
        var currentWindDeg = response.wind.deg;
        // Transfer content to HTML
        htmlElements += '<div class="card-heading" id="currentWeather">';  
        htmlElements += '<p class="card-title"><strong>Current Weather in '+currentCity+'</strong></p>';
        htmlElements += '</div>';
        htmlElements += '<div class="card-body" id="weatherWrapper">';     
        htmlElements += '<div>Humidity: '+currentHumidity+'</div>';
        htmlElements += '<div>Pressure: '+currentPressure+'</div>';
        htmlElements += '<div>Temp: '+currentTempF+'/'+currentTempC+'</div>';
        htmlElements += '<div>Max Temp: '+currentTempMaxF+'/'+currentTempMaxC+'</div>';
        htmlElements += '<div>Min Temp: '+currentTempMinF+'/'+currentTempMinC+'</div>';
        htmlElements += '<div>Wind speed/deg: '+currentWindSpeed+'/'+currentWindDeg+'</div>';
        htmlElements += '</div>';

        $('#weatherWrapper').append(htmlElements)
  

    });

}

function log(i) {
  console.log(i);
}

function temperatureConverterF(valNum) {
  valNum = parseFloat(valNum);
  return ((valNum-273.15)*1.8)+32;
}

function temperatureConverterC(valNum) {
  valNum = parseFloat(valNum);
  return (valNum-273.15);
}

