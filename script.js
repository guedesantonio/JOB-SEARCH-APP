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

const jobSearchBox = $(".searchBox");
let jobSearchKeyword;

jobSearchBox.keypress(function (event) {
    if (event.keyCode == 13 || event.which == 13) {
        jobSearchKeyword = jobSearchBox.text();
        $.ajax({
            url: "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=f960f7d3&app_key=8815afa06c70515964d774a471c8c248&results_per_page=20&what=" + jobSearchKeyword + "&content-type=application/json",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //job title header prototype
            $("#positionName").html(response.results[0].title);
            //description div prototype
            // $("#positionLink").html(response.results[0].redirect_url);
            //ad url anchor prototype
            $("a").append($("<a href=" + response.results[0].redirect_url + ">Apply Here</a>"));
        })
    }
});




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