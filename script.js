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
const permanentPositionCheckBox = $("#checkPerm");
const fullTimeJobsCheckBox = $("#checkFullTime");
const salarySortCheckBox = $("#checkSalaryOrder");
let jobSearchKeyword = "";
let locationSearchKeyword = "";
let permanentPositionValue = "";
let fullTimePositionValue = "";
let sortBySalaryValue = "";
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
    if (jobSearchBox.val() !== "" && locationSearchBox.val() === "") {
        jobSearchKeyword = jobSearchBox.val();
        localStorage.setItem("jobName", jobSearchKeyword);
        locationSearchKeyword = "";
        localStorage.setItem("locationName", locationSearchKeyword);
    }

    jobResultsDiv.html("")
    $.ajax({
        url: "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=f960f7d3&app_key=8815afa06c70515964d774a471c8c248&results_per_page=10&what=" + jobSearchKeyword + "&where=" + locationSearchKeyword + "&permanent=" + permanentPositionValue + "&full_time=" + fullTimePositionValue + sortBySalaryValue + "&content-type=application/json",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < response.results.length; i++) {
            jobResultsDiv.append($('<h3 id="positionName"><i class="material-icons">face</i>' + response.results[i].title.replace(/<strong>/g, '') + '</h3>'));
            jobResultsDiv.append($('<a id="positionLink" href="' + response.results[i].redirect_url + '" target="_blank"><i class="material-icons">link</i> Apply Here </a><h4><i class="material-icons">details</i> Details </h4>'));
            jobResultsDiv.append($('<p id=positionDesc>' + response.results[i].description.replace(/<strong>/g, '') + '</p > '));
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

fullTimeJobsCheckBox.on("click", function () {
    if (document.getElementById("checkFullTime").checked) {
        fullTimePositionValue = "1";
        jobSearch();
    } else {
        fullTimePositionValue = "";
        jobSearch();
    }
});

permanentPositionCheckBox.on("click", function () {
    if (document.getElementById("checkPerm").checked) {
        permanentPositionValue = "1";
        jobSearch();
    } else {
        permanentPositionValue = "";
        jobSearch();
    }
})

salarySortCheckBox.on("click", function () {
    if (document.getElementById("checkSalaryOrder").checked) {
        sortBySalaryValue = "&sort_by=salary";
        jobSearch();
    } else {
        sortBySalaryValue = "";
        jobSearch();
    }
})

appStart();

// =============================================================================================================
// Anna's Code
// =============================================================================================================
// const searchTerm = $("#jobSearch").val();
// const queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;

$.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=javascript",
    method: "GET"
}).then(function (response) {
    console.log(response);
    let bookArray = response.items;
    console.log(bookArray)
    const displayBookSlide = $(".slides");

    for (let i = 0; i < 5; i++) {
        const newDiv = $("<div>").addClass(`slide-${i+1}`);
        const bookDiv = $("<div>").addClass("pure-g bookDetails");
        const imageDiv = $("<div>").addClass("pure-u-5-24 pure-u-sm-1");
        const bookThumbnail = $("<img>").attr({
            src: bookArray[i].volumeInfo.imageLinks.thumbnail,
            alt: "book cover"
        });
        imageDiv.append(bookThumbnail);

        const bookDescriptionDiv = $("<div>").addClass("pure-u-19-24 pure-u-sm-1");

        const bookTitle = $("<h3>").addClass("bookTitle");
        bookTitle.text(`${bookArray[i].volumeInfo.title}: ${bookArray[i].volumeInfo.subtitle}`);
        const rating = $("<h4>").addClass("bookRating");
        rating.html(`Rating: ${bookArray[i].volumeInfo.averageRating}`);

        const bookDescription = $("<p>").addClass("bookDescription");
        const description = bookArray[i].volumeInfo.description;
        bookDescription.text(description);

        const bookPurchase = $("<a>").addClass("bookBuy");
        bookPurchase.text("Click here for more information");
        bookPurchase.attr("href", bookArray[i].volumeInfo.infoLink)

        bookDescriptionDiv.append(bookTitle);
        bookDescriptionDiv.append(rating);
        bookDescriptionDiv.append(bookDescription);
        bookDescriptionDiv.append(bookPurchase);

        bookDiv.append(imageDiv);
        bookDiv.append(bookDescriptionDiv);
        newDiv.append(bookDiv);

        displayBookSlide.append(newDiv);
    }
});