'use strict';
const { hashSync } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: '123@123',
          pass: hashSync('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Petya',
          email: 'petya@petya',
          pass: hashSync('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'aboba',
          email: 'aboba@aboba',
          pass: hashSync('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'aaboba',
          email: 'aaboba@aboba',
          pass: hashSync('123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
