'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    wheels: DataTypes.STRING,
    vehicleTypeId: DataTypes.INTEGER,
    vehicleId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    vehicleName: DataTypes.STRING // <-- Add this line
  }, {});

  Booking.associate = function(models) {
    Booking.belongsTo(models.VehicleType, { foreignKey: 'vehicleTypeId' });
    Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
  };

  return Booking;
};
