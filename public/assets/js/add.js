<<<<<<< HEAD
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
=======
$('#goal-submit').one('click',function(event){
    event.preventDefault();
    var newGoal = {
        goal: $('#goal-input').val().trim(),
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
>>>>>>> 68fe000ea1f513d63d08059f1d8c43a8c410710f
