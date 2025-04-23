'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    name: DataTypes.STRING,
    vehicleTypeId: DataTypes.INTEGER
  }, {});

  Vehicle.associate = function(models) {
    Vehicle.belongsTo(models.VehicleType, { foreignKey: 'vehicleTypeId' });
    Vehicle.hasMany(models.Booking, { foreignKey: 'vehicleId' });
  };

  return Vehicle;
};
