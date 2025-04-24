'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('Bookings', ['vehicleId', 'startDate', 'endDate'], {
      name: 'vehicle_booking_date_index',
      unique: true,
      where: {
        vehicleId: {
          [Sequelize.Op.ne]: null, // Ensure vehicleId is not null
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Bookings', 'vehicle_booking_date_index');
  }
};
