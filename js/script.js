
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    // YOUR CODE GOES HERE!

    var $street = $('#street').val();
    var $city = $('#city').val();
    $greeting.text("So, you want tolive at " + $street + ',' + $city + '?')
    $('body').append(`<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${$street},${$city}&key=AIzaSyDwlnunfGTRO8BJaxeblywb7eD4Ws3OAHM">`);
    

    $nytHeaderElem.text("New York Times Articles About "+ $city);
    $.getJSON(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${$city}&begin_date=20180101&api-key=FZRY8u7hczFeCsaxJMHkZu97fnEyBFf3`, function(data){
        $.each(data.response.docs, function(index, value){
          $('<li class="article">' + `<a href="${value.web_url}">${value.headline.main}</a>`+ `<p>${value.snippet}</p>`+ '</li>').appendTo("#nytimes-articles");
        })
    }).fail(function(jqXHR){
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
