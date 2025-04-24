'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', category: 'Car', createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', category: 'Car', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', category: 'Car', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cruiser', category: 'Bike', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sports', category: 'Bike', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};
