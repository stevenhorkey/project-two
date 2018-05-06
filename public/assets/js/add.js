$( document ).ready(function() {

    $('#goal-submit').on('click',function(event){
        event.preventDefault();
        console.log('add clicked')
        var newGoal = {
            goal_name: 'hehe',
            goal_description: $('#goal-input').val().trim(),
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
});