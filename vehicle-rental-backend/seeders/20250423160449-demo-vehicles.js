'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vehicles', [
      { name: 'Maruti Swift', vehicleTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hyundai Creta', vehicleTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Honda City', vehicleTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Royal Enfield Classic', vehicleTypeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'KTM Duke 390', vehicleTypeId: 5, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
