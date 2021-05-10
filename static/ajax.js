// ========== Functions ===========

// --- remove nomination function ---
function removeNomination(evt) {
    console.log("remove nomination function called");

    let btn = $(evt.target)
    let movieId = btn.attr("value"); 

    // send server request to remove from session 
    $.get("/remove-nom", {"movie_id": movieId}, (res) => {
        $(`#${movieId}`).remove();
        // hide banner if under 5
        if (res==="4") {
            $("#done-banner").addClass("invisible");
            $("#done-banner").removeClass("visible");
        };
    });
};


// --- add nomination function ---
function addNomination(evt) {
    console.log("add nomination function called");

    let btn = $(evt.target);
    let movieId = btn.attr("value"); 
    let movieInfo = btn.attr("name");
    
    // send server request to add to session
    $.get("/nominate", {"movie_id": movieId}, (res) => {
        if (res === "full") {
            alert("oops! please remove a nomination to place another vote");
        } else {
            // disable add_button in results list
            btn.prop("disabled", true);

            // update nominated div
            console.log("nomination done for");
            console.log(res);

            let delButton = `<button class="del-nom btn btn-sm btn-outline-secondary"` +
                            `value=${movieId} name="${movieInfo}">Remove` + 
                            `</button>`
            let newMovieRow = `<li id=${movieId}>${movieInfo} ${delButton}</li>`
            $("#nom-list").append(`${newMovieRow}`);

            // add event listener to new movie's remove button
            $("button.del-nom").on("click", (evt) => {
                removeNomination(evt);
            });

            // display banner if 5 noms reached
            if (res==="5") {
                $("#done-banner").addClass("visible");
                $("#done-banner").removeClass("invisible");
            };
        }; 
    });

};


// ======= Event Listeners ========
 
// --- Run search and display results ---
$("#title-search").on("submit", (evt) => {
    evt.preventDefault();
    // gather necessary data 
    const searchTerm = $("#title-field").val();
    // send request to server
    $.get("/search", {"title-field": searchTerm}, (res) => {
        console.log(res);
        $("#results-list").empty();

        // handle response 
        $("#results-header").html(`Results for "${searchTerm}"`);

        // loop thru 5 results
        // add each result to results-list using index - title, year, button
        for (let i=0; i<5; i+=1) {
            let movieTitle = res.Search[i].Title;
            let movieYear = res.Search[i].Year;
            let movieId = res.Search[i].imdbID;

            let nomButton = `<button class="nominate btn btn-sm btn-outline-secondary"` + 
                            `value=${movieId} ` + 
                            `name="${movieTitle} (${movieYear})">Nominate` + 
                            `</button>`
            $("#results-list").append(`<li>${movieTitle} (${movieYear}) ${nomButton}</li>`);
            
            // // if movieId is nominated, disable add button
            // ! fixme
            // $("#nom-list > li").each( function () {
            //     let nomId = $(this).attr("id");
            //     if (movieId === nomId) {
            //         nomButton.prop("disabled", true);
            //     };
            // });
        };

        // *** add event listener to all search results: nomination buttons
        $("button.nominate").on("click", (evt) => {
            console.log(evt.target);
            addNomination(evt);
        });
    });
});


// ======= RUN ON PAGE LOAD ===========

// --- listener for remove buttons on page load ---
$("button.del-nom").on("click", (evt) => {
    removeNomination(evt);
});

// --- show banner if 5 noms on page load ---
if (currentCount === 5) {
    // show banner if  5
    $("#done-banner").addClass("visible");
    $("#done-banner").removeClass("invisible");
};
