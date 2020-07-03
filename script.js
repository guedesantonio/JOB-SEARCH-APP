// ============================================================================================================
// Mo's Code
// =========================================================================================================

const jobSearchBox = $("#jobInput");
const jobSearchButton = $("#jobSearchButton");
const locationSearchBox = $("#locationInput");
const locationSearchButton = $("#locationSearchButton");
const jobResultsDiv = $("#jobResult")
const permanentPositionCheckBox = $("#checkPerm");
const fullTimeJobsCheckBox = $("#checkFullTime");
const salarySortCheckBox = $("#checkSalaryOrder");
const clearSearchButton = $("#clearButton");
let jobSearchKeyword = "";
let locationSearchKeyword = "";
let permanentPositionValue = "";
let fullTimePositionValue = "";
let sortBySalaryValue = "";
let searchResults = [];
let jobSearchCalls = 0;

function jobSearch() {

    jobSearchCalls++;

    if (jobSearchBox.val() === "" && jobSearchKeyword === "") {
        return;
    }
    if (jobSearchBox.val() !== "") {
        jobSearchKeyword = jobSearchBox.val();
        //checks to see whether we have 12 items in our search results.If so, removes the very first item and adds the latest search term to the search results so it can limit the total reults to 12 while updating the list with the latest search result
        if (searchResults.length < 12) {
            searchResults.push({
                keyword: jobSearchKeyword,
                permanent: permanentPositionValue,
                fulltime: fullTimePositionValue,
                salarySort: sortBySalaryValue,
                location: locationSearchKeyword
            });
        } else {
            searchResults.shift();
            searchResults.push({
                keyword: jobSearchKeyword,
                permanent: permanentPositionValue,
                fulltime: fullTimePositionValue,
                salarySort: sortBySalaryValue,
                location: locationSearchKeyword
            });
        }

        localStorage.setItem("searchParameters", JSON.stringify(searchResults));
    }

    jobResultsDiv.html("")
    $.ajax({
        url: "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=f960f7d3&app_key=8815afa06c70515964d774a471c8c248&results_per_page=10&what=" + jobSearchKeyword + "&where=" + locationSearchKeyword + "&permanent=" + permanentPositionValue + "&full_time=" + fullTimePositionValue + sortBySalaryValue + "&content-type=application/json",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < response.results.length; i++) {
            jobResultsDiv.append($('<a id="positionLink" href="' + response.results[i].redirect_url + '" target="_blank"><h3 id="positionName style="text-align:left;">' + response.results[i].title.replace(/<strong>/g, '') + '</h3></a>'));
            jobResultsDiv.append($('<p id=positionDesc style="text-align:justify;">' + response.results[i].description.replace(/<strong>/g, '') + '</p > '));
        }
    })
    renderBookResults(jobSearchKeyword);
}

function locationSearch() {
    locationSearchKeyword = locationSearchBox.val();
    jobSearch();
}

function appStart() {

    if (localStorage.length !== 0) {

        searchResults = JSON.parse(localStorage.getItem("searchParameters"));
        let buttondiv1 = $("<div class='pure-u-1 pure-u-md-1-3 buttonDiv'>");
        let buttondiv2 = $("<div class='pure-u-1 pure-u-md-1-3 buttonDiv'>");
        let buttondiv3 = $("<div class='pure-u-1 pure-u-md-1-3 buttonDiv'>");

        // Rendering 4 buttons per row for the last 12 search results (3 rows in total of 4 columns each)
        clearSearchButton.removeClass("hidden");
        //If we have 4 results or less
        if (searchResults.length <= 4) {
            for (let i = 0; i < searchResults.length; i++) {
                let button = $("<button class='button-secondary pure-button'>" + searchResults[i].keyword + "</button>");
                buttondiv1.prepend(button);
            }
            $(".previousSearches").prepend(buttondiv1);
        }

        //If we have between 4 and 8 results (excluding 4)
        if (searchResults.length > 4 && searchResults.length <= 8) {
            for (let i = 0; i < 4; i++) {
                let button = $("<button class='button-secondary pure-button'>" + searchResults[i].keyword + "</button>");
                buttondiv1.prepend(button);
            }
            for (let i = 4; i < searchResults.length; i++) {
                let button = $("<button class='button-secondary pure-button'>" + searchResults[i].keyword + "</button>");
                buttondiv2.prepend(button);
            }
            $(".previousSearches").prepend(buttondiv1);
            $(".previousSearches").prepend(buttondiv2);
        }

        // If we have between 8 and 12 results (excluding 8)
        if (searchResults.length > 8 && searchResults.length <= 12) {
            for (let i = 0; i < 4; i++) {
                let button = $("<button class='button-secondary pure-button'>" + searchResults[i].keyword + "</button>");
                buttondiv1.prepend(button);
            }
            for (let i = 4; i < 8; i++) {
                let button = $("<button class='button-secondary pure-button'>" + searchResults[i].keyword + "</button>");
                buttondiv2.prepend(button);
            }
            for (let i = 8; i < searchResults.length; i++) {
                let button = $("<button class='button-secondary pure-button'>" + searchResults[i].keyword + "</button>");
                buttondiv3.prepend(button);
            }
            $(".previousSearches").prepend(buttondiv1);
            $(".previousSearches").prepend(buttondiv2);
            $(".previousSearches").prepend(buttondiv3);
        }

        jobSearchKeyword = searchResults[searchResults.length - 1].keyword;
        jobSearchBox.val(jobSearchKeyword);

        permanentPositionValue = searchResults[searchResults.length - 1].permanent;
        if (permanentPositionValue !== "") {
            document.getElementById("checkPerm").checked = true;
        }
        fullTimePositionValue = searchResults[searchResults.length - 1].fulltime;
        if (fullTimePositionValue !== "") {
            document.getElementById("checkFullTime").checked = true;
        }
        sortBySalaryValue = searchResults[searchResults.length - 1].salarySort;
        if (sortBySalaryValue !== "") {
            document.getElementById("checkSalaryOrder").checked = true;
        }
        locationSearchKeyword = searchResults[searchResults.length - 1].location;
        locationSearchBox.val(locationSearchKeyword);

        jobResultsDiv.html("")
        $.ajax({
            url: "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=f960f7d3&app_key=8815afa06c70515964d774a471c8c248&results_per_page=10&what=" + jobSearchKeyword + "&where=" + locationSearchKeyword + "&permanent=" + permanentPositionValue + "&full_time=" + fullTimePositionValue + sortBySalaryValue + "&content-type=application/json",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (let i = 0; i < response.results.length; i++) {
                jobResultsDiv.append($('<a id="positionLink" href="' + response.results[i].redirect_url + '" target="_blank"><h3 id="positionName style="text-align:left;">' + response.results[i].title.replace(/<strong>/g, '') + '</h3></a>'));
                jobResultsDiv.append($('<p id=positionDesc style="text-align:justify;">' + response.results[i].description.replace(/<strong>/g, '') + '</p > '));
            }
        })

        renderBookResults(jobSearchKeyword);
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

clearSearchButton.on("click", function () {
    localStorage.clear();
    $(".previousSearches").html('');
    clearSearchButton.addClass('hidden');
})

appStart();

// =============================================================================================================
// Anna's Code
// =============================================================================================================


function renderBookResults(jobSearchKeyword) {
    $(".slides").html('')
    $(".booksH3").removeClass("hidden");
    let searchTerm = jobSearchBox.val();

    if (jobSearchKeyword) {
        searchTerm = jobSearchKeyword
    }

    let queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let bookArray = response.items;
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

            const bookTitleDisplay = $("<h3>").addClass("bookTitle");
            const booktitle = bookArray[i].volumeInfo.title;
            const subtitle = bookArray[i].volumeInfo.subtitle * 20;
            if (subtitle) {
                bookTitleDisplay.text(`${booktitle}: ${subtitle}`);
            } else {
                bookTitleDisplay.text(`${booktitle}`);
            }

            const ratingDisplay = $("<h4>").addClass("bookRating");
            const rating = bookArray[i].volumeInfo.averageRating;
            const ratingStar = (rating / 5) * 100;
            if (rating) {
                ratingDisplay.html(`Rating: <span class='stars-container stars-${ratingStar}'>★★★★★</span>`);
            } else {
                ratingDisplay.text('');
            }

            const bookDescription = $("<p>").addClass("bookDescription");
            const description = bookArray[i].volumeInfo.description;
            bookDescription.text(description);

            const bookPurchase = $("<a>").addClass("bookBuy");
            bookPurchase.text("Click here for more information");
            bookPurchase.attr({
                href: bookArray[i].volumeInfo.infoLink,
                target: "_blank"
            })

            bookDescriptionDiv.append(bookTitleDisplay);
            bookDescriptionDiv.append(ratingDisplay);
            bookDescriptionDiv.append(bookDescription);
            bookDescriptionDiv.append(bookPurchase);

            bookDiv.append(imageDiv);
            bookDiv.append(bookDescriptionDiv);
            newDiv.append(bookDiv);

            displayBookSlide.append(newDiv);
        }

        //Ensures that the page scrolling only happens after the first run of the program by counting the number of times the jobSearch function has been called. Also, ensures that the page auto scrolling works if the user is doing the first search using the app(otherwise the auto scrolling does not work if there is nothing inside the local storage and user is doing the very first search).
        if (jobSearchCalls > 1 || (jobSearchCalls === 1 && searchResults.length >= 1)) {
            document.getElementById("booksResult").scrollIntoView();
        }

    });
}