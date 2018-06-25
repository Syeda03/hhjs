
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
});
  
function displayLocations(location, term, results) {
    location = location.trim().split(' ').join('+');
    term = term.trim().split(' ').join('+');
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

            // Appending the paragraph and image tag to the giftasticDiv
            yelpDiv.append(yelpImage);
            yelpDiv.append(p);
            // Prependng the giftasticDiv to the HTML page in the "#gifs-appear-here" div
            $("#mainDisplayYelp").append(yelpDiv);
        }

    }).fail(function(jqXHR, textStatus) {
        console.error(textStatus)
    })

}


function log(i) {
  console.log(i);
}


