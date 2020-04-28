'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'isLogged',
      {
        type: Sequelize.BOOLEAN
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'isLogged',
    );
  }
};
