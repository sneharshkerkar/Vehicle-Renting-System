'use strict';
module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    name: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  
  VehicleType.associate = function(models) {
    VehicleType.hasMany(models.Vehicle, { foreignKey: 'vehicleTypeId' });
  };

  return VehicleType;
};
