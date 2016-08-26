
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    //this changes the greeting text after address is inputed by the user:
    $greeting.text('So, you want to live at ' + address + '?');

    //this loads the streetview as a background image from Google maps API:
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    //this appends our image in the end of the index.html body:
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    //this loads NYTimes articles w/ API key I got:
    // My API key:  0d442c8389344a8cb41f3a1957eab259
    // NYT url with API key:  https://api.nytimes.com/svc/search/v2/articlesearch.json?0d442c8389344a8cb41f3a1957eab259

    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=0d442c8389344a8cb41f3a1957eab259';
    $.getJSON( nytimesUrl, function( data ) {

        $nytHeaderElem.text('New York Times Articles about ' + cityStr);

        articles = data.response.docs;
        for (var i=0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>' +
                '<p>' + article.snippet + '</p>' +
                '</li>');
        };

        // console.log(data);
        }).fail(function(e) {
            $nytHeaderElem.text('New York Times Articles about ' + cityStr + ' Could Not Be Loaded');
        });

    return false;
};

//this runs loadData function after 'Submit' is clicked:
$('#form-container').submit(loadData);
