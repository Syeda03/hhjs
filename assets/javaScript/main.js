var yelpCatagory,hhjssMessages,currentCity,currentImage1,currentImage2,currentImage3,currentDescription;

yelpCatagory = {
    sightSeeing: {
        city:"Grotto of Redemption Iowa",
        image: ['Iowa1.jpg', 'Iowa2.jpg', 'Iowa3.jpg'],
        description: "The Shrine of the Grotto of the Redemption is a religious shrine located in West Bend, Iowa, in the Roman Catholic Diocese of Sioux City. A conglomeration of nine grottos depicting scenes in the life of Jesus, the Grotto contains a large collection of minerals and petrifications and is believed to be the largest grotto in the world. It is also considered to be the world's most complete man-made collection of minerals, fossils, shells, and petrifications in one place.",
        weatherURL: "",
    },
    beach: {
        city:"Myrtle Beach South Carolina",
        image: ['SC.jpg', 'SC2.jpg', 'SC3.jpg'],
        description: "Myrtle Beach, a city and vacation resort on South Carolina’s Atlantic coast, is the hub of the Grand Strand, a 60-mile string of beaches. It’s also known for its celebrity-designed golf courses. Along its beachfront boardwalk are arcades, souvenir stands and restaurants, as well as the old-fashioned Family Kingdom amusement park and the SkyWheel, one of the country’s tallest Ferris wheels.",
        weatherURL: "",
    },
    hiking: {
        city:"Glenwood Springs Colorado",
        image: ['GlenwoodSprings1.jpg', 'GlenwoodSprings2.jpg', 'GlenwoodSprings3.jpg'],
        description: "Glenwood Springs is a resort city in Colorado known for its hot springs. It sits in the rugged Rocky Mountains, surrounded by the vast White River National Forest. Glenwood Canyon is rich with wildlife and features Hanging Lake, with its striking turquoise waters. Glenwood Caverns are ancient underground caves. Glenwood Caverns Adventure Park has roller coasters and canyon swings overlooking the Colorado River.",
        weatherURL: "",
    },
    skiing: {
        city:"Anchorage Alaska",
        image: ['Alaska.jpg', 'Alaska2.jpg', 'Alaska3.jpg'],
        description: "Anchorage, Alaska’s largest city in the south-central part of the state on the Cook Inlet. It's known for its cultural sites, including the Alaska Native Heritage Center, which displays traditional crafts, stage dances, and presents replicas of dwellings from the area’s indigenous groups. The city is also a gateway to nearby wilderness areas and mountains including the Chugach, Kenai and Talkeetna.",
        weatherURL: "",
    },
    history: {
        city:"Savannah Georgia",
        image: ['Savannah1.jpg', 'Savannah2.jpg', 'Savannah3.jpg'],
        description: "Savannah, a coastal Georgia city, is separated from South Carolina by the Savannah River. It’s known for manicured parks, horse-drawn carriages and antebellum architecture. Its historic district is filled with cobblestoned squares and parks such as Forsyth Park shaded by oak trees covered with Spanish moss.",
        weatherURL: "",
    },
    arts: {
        city:"San Juan Puerto Rico",
        image: ['SanJuan1.jpg', 'SanJuan2.jpg', 'SanJuan3.jpg'],
        description: "San Juan, Puerto Rico's capital and largest city, sits on the island's Atlantic coast. Its widest beach fronts the Isla Verde resort strip, known for its bars, nightclubs and casinos. Cobblestoned Old San Juan features colorful Spanish colonial buildings and 16th-century landmarks including El Morro and La Fortaleza, massive fortresses with sweeping ocean views, as well as the Paseo de la Princesa bayside promenade.",
        weatherURL: "",
    }
};

hhjssMessages = {
    displayWeatherTitle: "Current Weather in",
    displayWeatherHumidity: "Humidity",
    displayWeatherPressure: "Pressure",
    displayWeatherTemp: "Temp",
    displayWeatherMaxTemp: "Max Temp",
    displayWeatherMinTemp: "Min Temp",
    displayWeatherWind: "Wind speed/deg",
    createHtmlPhone: "Phone number",
    createHtmlRating: "Rating",
    onClickRestaurantsHeading: "Recommended Restaurants",
    onClickLodgingHeading: "Recommended Lodging",
    onClickAttractionsHeading: "Recommended Attractions",

}


// ###########################
// ###     createHTML      ###
// ###########################
function createHTML(results, i) {
    var resultsUrl = results[i].url;
    var resultsName = results[i].name;
    var resultsImageUrl = results[i].image_url
    var resultsLocationAddress1 = results[i].location.address1;
    var resultsLocationCity = results[i].location.city;
    var resultsLocationState = results[i].location.state;
    var resultsLocationZipCode = results[i].location.zip_code;
    var resultsPhone = results[i].display_phone;
    var resultsRating = results[i].rating;

    var htmlElements = ''
    htmlElements += '<li class="regular-search-result">';  
    htmlElements += '   <div class="container">';
    htmlElements += '       <div class="row">';
    htmlElements += '           <div class="span3">';
    htmlElements += '               <a href="'+resultsUrl+'" target="_blank"> <img alt="'+resultsName+'" class="photo-box-img" height="90" src="'+resultsImageUrl+'" width="90"></a>';
    htmlElements += '           </div>';
    htmlElements += '           <div class="span9">';
    htmlElements += '               <h3 class="search-result-title"> <span class="indexed-biz-name">'+(i+1)+'. <a class="biz-name" href="'+resultsUrl+'" target="_blank"><span>'+resultsName+'</span></a> </span> </h3>';
    htmlElements += '               <div class="biz-rating biz-rating-large clearfix">'+hhjssMessages.createHtmlRating+': <span class="stars">'+resultsRating+'</span></div>';
    htmlElements += '               <address>'+resultsLocationAddress1+', '+resultsLocationCity+' '+resultsLocationState+' '+resultsLocationZipCode+'<br/><span class="offscreen">'+hhjssMessages.createHtmlPhone+'</span> <span class="biz-phone"> '+resultsPhone+' </span></address>';
    htmlElements += '           </div>';
    htmlElements += '       </div>';
    htmlElements += '   </div>';
    htmlElements += '</li>';
    return htmlElements
}


// ###########################
// ###  CLICK EVENTS HERE  ###
// ###########################
// Get value of dropdown menu when clicked
$(".dropdown-menu").on('click', 'a', function(){
    // Display Chosen value at top location
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());

    // Get chosen value and call required functions
    var dropdownMenu = $(this).attr('value');
    log( " Dropdown Value: "+dropdownMenu );
    // Get values from object
    currentCity = yelpCatagory[dropdownMenu].city;
    currentImage1 = yelpCatagory[dropdownMenu].image[0];
    currentImage2 = yelpCatagory[dropdownMenu].image[1];
    currentImage3 = yelpCatagory[dropdownMenu].image[2];
    currentDescription =  yelpCatagory[dropdownMenu].description;
    log('currentCity: '+currentCity)

    $('#mainImage').empty();
    $('#mainDescription').empty();
    $('#insertRestaurants').empty();
    $('#insertLodging').empty();
    $('#insertAttractions').empty();
    $('#weatherWrapper').empty();

    $("#mainTitle").html("<h1>"+currentCity+"</h1>")
    $("#mainRestaurantsTitle").html("<h3>"+hhjssMessages.onClickRestaurantsHeading+"</h3>");
    $("#mainLodgingTitle").html("<h3>"+hhjssMessages.onClickLodgingHeading+"</h3>");
    $("#mainAttractionsTitle").html("<h3>"+hhjssMessages.onClickAttractionsHeading+"</h3>");
    
    var mainImage = $("<img>");
    // Setting the src attribute of the image to a property pulled off the result item
    mainImage.attr("src", "assets/images/"+currentImage1);
    mainImage.attr("alt", dropdownMenu)
    mainImage.attr("class", "mainImage");

    // $("#dropdownMenuButton").click(function(){
    //     $("#coverImage").hide();
    //     displayLocations();
        
        
    // });
    
    
    $('#mainImage').append(mainImage);
    $('#mainDescription').append(currentDescription);
  
    displayLocations(currentCity, 'restaurants', 'insertRestaurants');
    displayLocations(currentCity, 'lodging', 'insertLodging');
    displayLocations(currentCity, 'attractions', 'insertAttractions');
    displayWeather(currentCity);
 
    
});

// ###########################
// ###   launchFirebase    ###
// ###########################
function launchFirebase() {
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

        // User Info
        log('firstName: ' + firstName + ' location: ' + location);

        // Add each user's data into the table: use prepend so latest update is on top
        $("#visitor-table > tbody").prepend("<tr><td>" + firstName + "</td><td>" + location + "</td></tr>");
    });
}

// ###########################
// ###  displayLocations   ###
// ###########################
function displayLocations(location, term, className) {
    location = location.trim().split(' ').join('+');    // YELP API requires plus sign seperated elements
    term = term.trim().split(' ').join('+');            // YELP API requires plus sign seperated elements
    log('displayLocation- location: '+location+ ' term: ' +term+ ' className: ' +className);

    var currentId = $(this).attr('data-name');
    var ratingVal = '';
    var htmlElements = '';
    ratingVal = $('#dropdownMenuButton').val().toLowerCase();
    log(currentId+" "+ratingVal);

    $('#mainSpinner').html('<img id="spinnerGIF" src="assets/images/AJAX_Spinner.gif">');

    var originalURL = "https://api.yelp.com/v3/businesses/search?location="+location+"&sortby=rating&term=" + term;
    var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL;

    log('about to call yelp api: '+ queryURL);

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
        log('CORS anywhere response'+ JSON.stringify(response));
        log(queryURL);
        log(response);

        $('#spinnerGIF').css('display','none'); //Display Spinner while loading

        // storing the data from the AJAX request in the results variable
        var results = response.businesses;
        // var resultsLength = results.length;
        var resultsLength = 3;

        // Looping through each result item
        for (var i = 0; i < resultsLength; i++) {
            $("#"+className+"").append(createHTML(results,i));
        }

        $('span.stars').stars();     //Convert Numeric Rating to Starts

    }).fail(function(jqXHR, textStatus) {
        console.error(textStatus)
    })
}

// ###########################
// ###   displayWeather    ###
// ###########################
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
        var currentTempF = temperatureConverterF(response.main.temp) +' F ';
        var currentTempC = temperatureConverterC(response.main.temp) +' C ';
        var currentTempMaxF = temperatureConverterF(response.main.temp_max) +' F ';
        var currentTempMaxC = temperatureConverterC(response.main.temp_max) +' C ';
        var currentTempMinF = temperatureConverterF(response.main.temp_min) +' F ';
        var currentTempMinC = temperatureConverterC(response.main.temp_min) +' C ';
        var currentWindSpeed = response.wind.speed;
        var currentWindDeg = response.wind.deg;
        // Transfer content to HTML  
        htmlElements += '<div class="card-heading" id="currentWeather">';  
        htmlElements += '<p class="card-title"><strong>'+hhjssMessages.displayWeatherTitle+' '+currentCity+'</strong></p>';
        htmlElements += '</div>';
        htmlElements += '<div class="card-body" id="weatherWrapper">';     
        htmlElements += '   <div>'+hhjssMessages.displayWeatherHumidity+': '+currentHumidity+'</div>';
        htmlElements += '   <div>'+hhjssMessages.displayWeatherPressure+': '+currentPressure+'</div>';
        htmlElements += '   <div>'+hhjssMessages.displayWeatherTemp+': '+currentTempF+'/'+currentTempC+'</div>';
        htmlElements += '   <div>'+hhjssMessages.displayWeatherMaxTemp+': '+currentTempMaxF+'/'+currentTempMaxC+'</div>';
        htmlElements += '   <div>'+hhjssMessages.displayWeatherMinTemp+': '+currentTempMinF+'/'+currentTempMinC+'</div>';
        htmlElements += '   <div>'+hhjssMessages.displayWeatherWind+': '+currentWindSpeed+'/'+currentWindDeg+'</div>';
        htmlElements += '</div>';

        $('#weatherWrapper').append(htmlElements);
    });

}

// ###########################
// ###     initialize      ###
// ###########################
function initialize() {
  // The purpose of initialize is to display the default functionality

  launchFirebase();
}

// ###########################
// ### Utility Functions   ###
// ###########################
function temperatureConverterF(valNum) {
  valNum = parseFloat(valNum);
  return (((valNum-273.15)*1.8)+32).toFixed(1);
}
function temperatureConverterC(valNum) {
  valNum = parseFloat(valNum);
  return (valNum-273.15).toFixed(1);
}
function log(i) {
  // console.log(i);
}
$.fn.stars = function () {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

initialize();  // Calling the default functionality