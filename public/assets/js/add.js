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
