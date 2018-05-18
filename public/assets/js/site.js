(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
//executes these event listeners when the page is loaded
$(document).ready(function () {

    

    $('#sign-up-btn').on('click', function (event) {
        event.preventDefault();
    });

    $(".profile-pic").hover(
        function() {
          $('.fa-images').css("visibility","visible");
        }, function() {
          $('.fa-images').css("visibility","hidden");
        }
    );

    //This button click controls the goal submitting client side logic
    $('#goal-submit').on('click', function (event) {
        event.preventDefault();
        console.log('add clicked');
        //populates an object to send as a request, keys match names in the database
        var newGoal = {
            //UserId : userId
            goal_name: $('#goal-name-input').val().trim(),
            goal_description: $('#goal-description-input').val().trim(),
            completed: false
        }
        //The actual ajax call
        $.ajax('/api/goals', {
            type: 'POST',
            data: newGoal
        }).then(
            //console.log created new goal and reload the page
            function () {
                console.log('Created new goal');
                location.reload();
            });
    })
    //This PUT request is to change the goals from incomplete to completed
    $('.incomplete-circle').on('click', function (event) {
        event.preventDefault();
        //gets the id of the goal in the database
        var id = $(this).data('id');
        //Lets user know goal button has recognized the button click
        console.log('Goal clicked: ' + id)
        //toggleBool is the object we send with the PUT request
        var toggleBool = {
            completed: true
        }
        //The actual ajax call, includes the previous id as part the the url
        $.ajax('/api/goals/' + id, {
            type: 'PUT',
            data: toggleBool
        }).then(
            function () {
                location.reload();
            });
    })
    //This button click is in charge of updating the img src url for the users profile picture
    $('#profile-pic-change-submit').on('click', function (event) {
        event.preventDefault();
        //gets the new url for img src
        var input = $('#profile-pic-change').val().trim();
        //puts url in an object to send as a request
        var changePic = {
            image: input
        }
        //a flag to make sure the form has been filled out
        if (input !== '') {
            //the actual ajax call
            $.ajax('/api/profile', {
                type: 'PUT',
                data: changePic
            }).then(
                function () {
                    //reload the page after request is sent
                    location.reload();
                });
        }

    })
    //This on click function controls the trigger for deleting a users completed goals
    $('#del-completed-goals').on('click', function (event) {
        event.preventDefault();
        //in this case most of the information for handling this request is either passed by passportjs
        //as req.users or is already in our database, so no extra data is being sent with the request
        console.log('Goal deleted')
        //the actual ajax call, only gives a url and a type
        $.ajax('/api/goals/', {
            type: 'DELETE',
        }).then(
            function () {
                //reload page after request is sent
                location.reload();
            });
    })
    //this on click function controls the deletion of a single goal from the database
    $('.fa-trash-alt').on('click', function (event) {
        event.preventDefault();
        //gets the id number of the goal and assigns it to a variable
        var id = $(this).data('id');
        console.log('Goal deleted:' + id)
        //actual ajax call, url includes specific id number of the goal
        $.ajax('/api/goals/' + id, {
            type: 'DELETE',
        }).then(
            function () {
                //reload the page after reuqest has been sent
                location.reload();
            });
    })

    //This button controls the on click event to add friends
    $('.add-friend').on('click', function (event) {
        event.preventDefault();
        //peerId is the clicked users id in the users table
        var peerId = $(this).data('id');
        console.log(peerId);
        console.log('clicked');
        //put the clicked users id in an objectr with the key value having the same name as the column name in the friends table
        var addFriend = {
            friend_id: peerId
        }
        //the actual ajax request
        $.ajax('/friends', {
            type: 'POST',
            data: addFriend
        }).then(
            function () {
                //location.reload();
            }
        )
    })
})
