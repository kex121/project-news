'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'KeyWords',
      [
        {
          name: 'Кошка',
          isGood: true,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Животные',
          isGood: true,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'стрельба',
          isGood: false,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'стрельба',
          isGood: false,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Путин',
          isGood: true,
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('KeyWords', null, {});
  },
};
