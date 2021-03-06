//executes event listeners on page load
$(document).ready(function () {
    //declares an empty variable
    let searchName;
    //this on click function controls the search bar for finding other users if current user hits enter
    $('#search-input-nav').on('keypress', function (e) {
        if (e.which == 13) {
            $('.search-btn-nav').click();
            return false;    //<---- Add this line
        }
    })
    //this on click is for the search modals if user hits enter
    $('#search-input-m').on('keypress', function (e) {
        if (e.which == 13) {
            $('.search-btn-m').click();
            return false;    //<---- Add this line
        }
    })
    //this is for the search when submit button is clicked on navbar search
    $(".search-btn-nav").on("click", e => {
        //prevents page from loading on submit
        e.preventDefault();
        //gets the user-inputted search and assigns it to a variable
        searchName = $("#search-input-nav").val().trim();
        //console.logs for testing
        console.log(searchName);
        //actual ajax get request. searchname is included in url for later use
        if(searchName !== ''){
            $.ajax('/search/' + searchName, {
                type: 'GET'
            }).then(function (data) {
                //alert user of success
                console.log(data);
                console.log("You Pushed the Search Button");
                //relocate them to a new page based off their search
                window.location.replace('/search/' + searchName);
            })
        }
    });
    //this is for the search submit button on the modal
    $(".search-btn-m").on("click", e => {
        //prevents page from loading on submit
        e.preventDefault();
        //gets the user-inputted search and assigns it to a variable
        searchName = $("#search-input-m").val().trim();
        //console.logs for testing
        console.log(searchName);
        //actual ajax get request. searchname is included in url for later use
        if(searchName !== ''){
            $.ajax('/search/' + searchName, {
                type: 'GET'
            }).then(function (data) {
                //alert user of success
                console.log(data);
                console.log("You Pushed the Search Button");
                //relocate them to a new page based off their search
                window.location.replace('/search/' + searchName);
            })
        }
    });

    //this on click function controls the user selecting another users profile to view
    $(".peer-btn").unbind("click").on("click", function () {
        //gets id of the slected users profile to view
        var userId = $(this).data('id');
        //actual ajax get request userId is in the url for later use
        $.ajax('/peer/' + userId, {
            type: 'GET'
        }).then(function (data) {
            //alert user of success
            console.log(userId);
            console.log('You pressed a User Profile Button!');
            window.location.replace('/peer/' + userId);
        })
    });



});