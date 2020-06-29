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

const jobSearchBox = $("#jobInput");
const jobSearchButton = $("#jobSearchButton");
const locationSearchBox = $("#locationInput");
const locationSearchButton = $("#locationSearchButton");
const jobResultsDiv = $("#jobResult")
let jobSearchKeyword = "";
let locationSearchKeyword = "";
let searchResults = [];

function jobSearch() {
    if (localStorage.length !== 0) {
        jobSearchKeyword = localStorage.getItem("jobName");
        locationSearchKeyword = localStorage.getItem("locationName");
        console.log(jobSearchKeyword);
    } else
    if (jobSearchBox.val() === "") {
        return;
    }
    if (jobSearchBox.val() !== "") {
        jobSearchKeyword = jobSearchBox.val();
        localStorage.setItem("jobName", jobSearchKeyword);
    }

    jobResultsDiv.html("")
    $.ajax({
        url: "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=f960f7d3&app_key=8815afa06c70515964d774a471c8c248&results_per_page=10&what=" + jobSearchKeyword + "&where=" + locationSearchKeyword + "&content-type=application/json",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < response.results.length; i++) {
            jobResultsDiv.append($('<h3 id="positionName"><i class="material-icons">face</i>' + response.results[i].title + '</h3>'));
            jobResultsDiv.append($('<a id="positionLink" href="' + response.results[i].redirect_url + '" target="_blank"><i class="material-icons">link</i> Apply Here </a><h4><i class="material-icons">details</i> Details </h4>'));
            jobResultsDiv.append($('<p id=positionDesc>' + response.results[i].description.replace(/['"]+/g, '') + '</p>'));
        }
    })
}


function locationSearch() {
    if (locationSearchBox.val() !== "") {
        locationSearchKeyword = locationSearchBox.val();
        localStorage.setItem("locationName", locationSearchKeyword);
        jobSearch();
    }
}

function appStart() {
    if (localStorage.length !== 0) {
        jobSearch();
    }
}

jobSearchButton.on("click", function () {
    jobSearch();
});

jobSearchBox.keypress(function (event) {
    if (event.keyCode == 13 || event.which == 13) {
        jobSearch();
    }
});

locationSearchButton.on("click", function () {
    locationSearch();
});

locationSearchBox.keypress(function (event) {
    if (event.keyCode == 13 || event.which == 13) {
        locationSearch();
    }
});

appStart();

// =============================================================================================================
// Anna's Code
// =============================================================================================================
const searchTerm = $("#jobSearch").val();
const queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    let bookArray = response.items;
    const displayBooks = $("#booksResult");
    const bookThumbnail = $("<img>").attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);
    const rating = $("<p>").addClass("rating");
    rating.text(response.items[i].volumeInfo.averageRating);
    const bookTitle = $("<p>").addClass("bookTitle");
    bookTitle.text(`${response.items[i].volumeInfo.title}: ${response.items[i].volumeInfo.subtitle}`);

    displayBooks.append(bookThumbnail);
    displayBooks.append(rating);
    displayBooks.append(bookTitle);
});