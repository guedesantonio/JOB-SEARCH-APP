const firstSeacrhbox = $("#first-box");

$.ajax({
    url: "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=f960f7d3&app_key=8815afa06c70515964d774a471c8c248&results_per_page=20&what=javascript%20developer&content-type=application/json",
    method: "GET"
}).then(function (response) {
    console.log(response);
})

const searchTerm = "";
const apiKey = "AIzaSyBJ0EE3BhTz86K0yopCqgn45JS7EBuybwA";
const queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&type=video&key=" + apiKey + "&q=" + searchTerm;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
});