'use strict';

var bCrypt = require('bcrypt-nodejs');

var generateHash = function (password) {
  //This handles the encryption of the users password
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

};

var pass = generateHash('pass');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Chris',
      lastName: 'Helms',
      email: 'chris@data.com',
      password: pass,
      userName: 'chris123',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Steve',
      lastName: 'Ricky',
      email: 'Steve@data.com',
      password: pass,
      userName: 'steve123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Miles',
      lastName: 'Scooter',
      email: 'Miles@data.com',
      password: pass,
      userName: 'miles123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Oliver',
      lastName: 'Craig',
      email: 'Oliver@data.com',
      password: pass,
      userName: 'oliver123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Peter',
      lastName: 'Cummings',
      email: 'Peter@data.com',
      password: pass,
      userName: 'peter123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Jimmy',
      lastName: 'Sanchez',
      email: 'Jimmy@data.com',
      password: pass,
      userName: 'jimmy123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Kelly',
      lastName: 'Fischer',
      email: 'Kelly@data.com',
      password: pass,
      userName: 'kelly123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Delilah',
      lastName: 'Bangs',
      email: 'Delilah@data.com',
      password: pass,
      userName: 'delilah123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Jennica',
      lastName: 'Roberts',
      email: 'Jennica@data.com',
      password: pass,
      userName: 'jennica123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Greg',
      lastName: 'Busy',
      email: 'Greg@data.com',
      password: pass,
      userName: 'greg123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
