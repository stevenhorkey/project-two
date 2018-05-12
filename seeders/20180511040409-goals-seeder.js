'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Goals', [{
      UserId: 1,
      goal_name: 'Exercise',
      goal_description: 'For 2 hours today',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 2,
      goal_name: 'Take a walk',
      goal_description: 'Around the bock twice',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 3,
      goal_name: 'Make a friend',
      goal_description: 'If you really can',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 1,
      goal_name: 'Make dinner',
      goal_description: 'Use all new ingredients I dont normally use',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 2,
      goal_name: 'Write a song',
      goal_description: 'Using only my ukelele',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 3,
      goal_name: 'Have friends over for a game night',
      goal_description: 'This wednesday would be best',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 2,
      goal_name: 'Help someone homeless get food',
      goal_description: 'Go walk downtown for a few hours',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 1,
      goal_name: 'Do arts and crafts with kids',
      goal_description: 'Maybe coloring books, or paints',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 3,
      goal_name: 'Code a new application',
      goal_description: 'Spend sometime on HTML and Javascript before styling',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      UserId: 2,
      goal_name: 'Help Chedder Kregg in his quest for goat love',
      goal_description: 'Make sure to get tested after making said love',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Goals', null, {});

  }
};
