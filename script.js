// ============================================================================================================
// Mo's Code
// =========================================================================================================

//possible parameters for a basic search
//1. Number of retrieved results
//2. keyword
//possible parameters for a complex search
//1. Minimum Salary
//2. Searching for only full time jobs
//3. Searching for only permanent positions
//4. Excluding keywords that maycontain similar words like excluding ads for Java developers when you search for a Javascript job
//5. Choosing the city (This version of Adzuna API only works for the UK so the city must be anywere in the UK)
//6. Sorting the results by slaray 

$.ajax({
    url: "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=f960f7d3&app_key=8815afa06c70515964d774a471c8c248&results_per_page=20&what=javascript%20developer&content-type=application/json",
    method: "GET"
}).then(function (response) {
    console.log(response);
    //job title header prototype
    $(".first").append($("<h4>" + response.results[0].title + "</h4>"));
    //description div prototype
    $(".first").append($("<div>" + response.results[0].description + "</div>"));
    //ad url anchor prototype
    $(".first").append($("<a href=" + response.results[0].redirect_url + ">Apply Here</a>"));
})

// =============================================================================================================
// Anna's Code
// =============================================================================================================
const searchTerm = "";
const apiKey = "AIzaSyBJ0EE3BhTz86K0yopCqgn45JS7EBuybwA";
const queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&type=video&key=" + apiKey + "&q=" + searchTerm;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
});