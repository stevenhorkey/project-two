(function() {
    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        }, false);
    });
    }, false);
})();
$( document ).ready(function() {

    $('#sign-up-btn').on('click',function(event){
        event.preventDefault();
    });

    // var userId;
    // $.getJSON("api/user_data", function(data) {
    //     // Make sure the data contains the username as expected before using it
    //     if (data.hasOwnProperty('userId')) {
    //         console.log(data);
    //         console.log('User id: ' + data.userId);
    //         userId = data.userId;
    //     }
    // });
    $('#goal-submit').on('click',function(event){
        event.preventDefault();
        console.log('add clicked')
        var newGoal = {
            //UserId : userId
            goal_name: $('#goal-name-input').val().trim(),
            goal_description: $('#goal-description-input').val().trim(),
            completed : false
        }
        $.ajax('/api/goals',{
        type:'POST',
        data: newGoal
        }).then(
        function(){
        console.log('Created new goal');
        location.reload();
        });
    })
    $('.fa-circle').on('click',function(event){
        event.preventDefault();
        var id = $(this).data('id');

        console.log('Goal clicked: '+id)
        var toggleBool = {
            completed : true
        }
        $.ajax('/api/goals/'+id,{
            type:'PUT',
            data: toggleBool
        }).then(
        function(){
            location.reload();
        });
    })
    $('#del-completed-goals').on('click',function(event){
        event.preventDefault();

        console.log('Goal deleted')
        $.ajax('/api/goals/',{
            type:'DELETE',
        }).then(
        function(){
            location.reload();
        });
    })
    $('.fa-trash-alt').on('click',function(event){
        event.preventDefault();
        var id = $(this).data('id');
        console.log('Goal deleted:'+id)
        $.ajax('/api/goals/'+id,{
            type:'DELETE',
        }).then(
        function(){
            location.reload();
        });
    })

});

