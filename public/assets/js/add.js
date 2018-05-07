// $( document ).ready(function() {

//     var userId;
//     $.getJSON("api/user_data", function(data) {
//         // Make sure the data contains the username as expected before using it
//         if (data.hasOwnProperty('userId')) {
//             console.log('User id: ' + data.userId);
//             userId = data.userId;
//         }
//     });

//     $('#goal-submit').on('click',function(event){
//         event.preventDefault();
//         console.log('add clicked')
//         var newGoal = {
//             UserId : userId,
//             goal_name: 'hehe',
//             goal_description: $('#goal-input').val().trim(),
//             completed : false
//         }
//         $.ajax('/api/goals',{
//         type:'POST',
//         data: newGoal
//         }).then(
//         function(){
//         console.log('Created new goal');
//         location.reload();
//         });
//     })
// });
