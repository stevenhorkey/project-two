$(document).ready(function () {
    let searchName;

    $("#search").on("click", e => {
        e.preventDefault();

        searchName = $("#search-input").val().trim();
        console.log(searchName);

        window.location.replace('/search/' + searchName)
        // $.ajax('/search/' + searchName, {
        //     type: 'GET'
        // }).then(function (data) {
        //     console.log(data);
        //     console.log("You Pushed the Search Button");
        // })




    })
})