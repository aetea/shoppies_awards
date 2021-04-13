// ========== Functions ===========
// search function 
function searchMovieTitle(evt){};



// ======= Event Listeners ========
 
// listen for search 
$("#title-search").on("submit", (evt) => {
    evt.preventDefault();
    // gather necessary data 
    const searchTerm = $("#title-field").val();
    // send request to server
    $.get("/search", {"title-field": searchTerm}, (res) => {
        // handle response 
        $("#results-header").html(`Results for ${searchTerm}`);

        // display - test
        console.log(res);
        const firstTitle = res.Search[0].Title;
        $("#results-list").html(firstTitle);

        // loop thru 5 results
        // add each result to results-list using index - title, year, button
        for (let i=0; i<5; i+=1) {
            let movieTitle = res.Search[i].Title;
            let movieYear = res.Search[i].Year;
            let movieId = res.Search[i].imdbID;

            let nomButton = `<button id="nom-button" value=${movieId}>Nominate</button>`
            $("#results-list").append(`<li>${movieTitle} (${movieYear}) ${nomButton}</li>`);
        };
    });
});

// nominate movie
$("#nom-button").on("click", (evt) => {
    evt.preventDefault();
    // grab relevant data
    // check total_nominations < 5
    // add movie to session obj OR error dialog
    // update nominated list to add movie
});

// remove nomination
$("#rm-nom-button").on("click", (evt) => {
    evt.preventDefault();
    // grab relevant data
    // remove movie from session obj
    // update nominated list to remove movie 
});